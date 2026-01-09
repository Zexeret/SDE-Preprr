import {
  CURRENT_MODEL_VERSION,
  DEFAULT_FILE_BACKUP_CONFIG,
  type AppState,
} from "../model";
import { getIndexedDb } from "./getIndexedDb";
import { compressWithPako, generateChecksum } from "./helper";
import { saveFileBackupConfigToIDB } from "./saveToIndexedDB";
import {
  FILE_BACKUP_STORE,
  FILE_HANDLE_KEY,
  type ExportWrapper,
} from "./types";
import { getLogger } from "../logger";

const log = getLogger("file:backup-service");

// Check if File System Access API is supported
export const isFileSystemAccessSupported = (): boolean => {
  return "showOpenFilePicker" in window && "showSaveFilePicker" in window;
};

// Store file handle in IndexedDB
const storeFileHandle = async (handle: FileSystemFileHandle): Promise<void> => {
  log.debug("storeFileHandle() called for: {}", handle.name);
  try {
    const db = await getIndexedDb();
    await db.put(FILE_BACKUP_STORE, handle, FILE_HANDLE_KEY);
    log.info("File handle stored in IndexedDB: {}", handle.name);
  } catch (error) {
    log.error("Failed to store file handle: {}", error);
    throw error;
  }
};

// Retrieve file handle from IndexedDB
const getStoredFileHandle = async (): Promise<FileSystemFileHandle | null> => {
  log.debug("getStoredFileHandle() called");
  try {
    const db = await getIndexedDb();
    const handle = await db.get(FILE_BACKUP_STORE, FILE_HANDLE_KEY);
    if (handle && "kind" in handle && handle.kind === "file") {
      log.debug(
        "Found stored file handle: {}",
        (handle as FileSystemFileHandle).name
      );
      return handle as FileSystemFileHandle;
    }
    log.debug("No file handle found in IndexedDB");
    return null;
  } catch (error) {
    log.error("Failed to retrieve file handle: {}", error);
    return null;
  }
};

// Remove file handle from IndexedDB
const removeStoredFileHandle = async (): Promise<void> => {
  log.debug("removeStoredFileHandle() called");
  try {
    const db = await getIndexedDb();
    await db.delete(FILE_BACKUP_STORE, FILE_HANDLE_KEY);
    log.info("File handle removed from IndexedDB");
  } catch (error) {
    log.error("Failed to remove file handle: {}", error);
  }
};

// Request permission for a file handle
export const requestFilePermission = async (
  handle: FileSystemFileHandle,
  mode: "read" | "readwrite" = "readwrite"
): Promise<boolean> => {
  log.debug(
    "requestFilePermission() called - mode: {}, file: {}",
    mode,
    handle.name
  );
  try {
    const permission = await handle.queryPermission({ mode });
    log.debug("Current permission status: {}", permission);
    if (permission === "granted") {
      return true;
    }

    log.debug("Requesting permission from user...");
    const requestResult = await handle.requestPermission({ mode });
    log.debug("Permission request result: {}", requestResult);
    return requestResult === "granted";
  } catch (error) {
    log.error("Failed to request file permission: {}", error);
    return false;
  }
};

// Verify if stored handle is still valid and has permission
export const verifyStoredHandle = async (): Promise<{
  readonly handle: FileSystemFileHandle | null;
  readonly hasPermission: boolean;
  readonly fileName: string | null;
}> => {
  log.debug("verifyStoredHandle() called");
  const handle = await getStoredFileHandle();

  if (!handle) {
    log.debug("No stored handle to verify");
    return { handle: null, hasPermission: false, fileName: null };
  }

  try {
    // Check if we still have permission (this also validates the handle)
    log.debug("Checking permission for stored handle: {}", handle.name);
    const permission = await handle.queryPermission({ mode: "readwrite" });
    const hasPermission = permission === "granted";
    log.debug("Stored handle permission: {}", permission);

    return {
      handle,
      hasPermission,
      fileName: handle.name,
    };
  } catch (error) {
    // Handle might be invalid (file deleted/moved)
    log.warn(
      "Stored handle is invalid (file may have been moved/deleted): {}",
      error
    );
    await removeStoredFileHandle();
    return { handle: null, hasPermission: false, fileName: null };
  }
};

// Open file picker to select an existing file
export const openFilePicker =
  async (): Promise<FileSystemFileHandle | null> => {
    log.debug("openFilePicker() called");
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
        multiple: false,
      });
      log.info("File selected: {}", handle.name);
      return handle;
    } catch (error) {
      // User cancelled the picker
      if (error instanceof Error && error.name === "AbortError") {
        log.debug("File picker cancelled by user");
        return null;
      }
      log.error("Failed to open file picker: {}", error);
      throw error;
    }
  };

// Open save file picker to create a new file
export const createFilePicker =
  async (): Promise<FileSystemFileHandle | null> => {
    log.debug("createFilePicker() called");
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `sde-preprr-backup-${
          new Date().toISOString().split("T")[0]
        }.json`,
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
      });
      log.info("File created: {}", handle.name);
      return handle;
    } catch (error) {
      // User cancelled the picker
      if (error instanceof Error && error.name === "AbortError") {
        log.debug("Save file picker cancelled by user");
        return null;
      }
      log.error("Failed to create file picker: {}", error);
      throw error;
    }
  };

// Save app state to file
export const saveToFile = async (
  handle: FileSystemFileHandle,
  state: AppState
): Promise<number> => {
  log.debug("saveToFile() called for: {}", handle.name);
  try {
    // Verify permission before writing
    log.debug("Verifying write permission...");
    const hasPermission = await requestFilePermission(handle);
    if (!hasPermission) {
      log.error("Permission denied to write to file");
      throw new Error("Permission denied to write to file");
    }

    log.debug("Serializing and compressing state...");
    const jsonString = JSON.stringify(state);
    const checksum = generateChecksum(jsonString);

    const wrapper: ExportWrapper = {
      compressed: true,
      version: CURRENT_MODEL_VERSION,
      checksum,
      data: compressWithPako(jsonString),
    };

    log.debug("Writing to file...");
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(wrapper));
    await writable.close();

    const savedAt = Date.now();
    log.info("App state saved to file: {}", handle.name);

    return savedAt;
  } catch (error) {
    log.error("Failed to save to file: {}", error);
    throw error;
  }
};

// Read app state from a file handle
export const readFromFileHandle = async (
  handle: FileSystemFileHandle
): Promise<File> => {
  // Verify permission before reading
  const hasPermission = await requestFilePermission(handle, "read");
  if (!hasPermission) {
    throw new Error("Permission denied to read file");
  }

  const file = await handle.getFile();
  return file;
};

// Disconnect file (remove handle and reset config)
export const disconnectFile = async (): Promise<void> => {
  await removeStoredFileHandle();
  await saveFileBackupConfigToIDB(DEFAULT_FILE_BACKUP_CONFIG);
};

// Connect to a file (either open existing or create new)
export const connectToFile = async (
  mode: "open" | "create"
): Promise<{
  readonly handle: FileSystemFileHandle;
  readonly fileName: string;
} | null> => {
  const handle =
    mode === "open" ? await openFilePicker() : await createFilePicker();

  if (!handle) {
    return null;
  }

  // Request permission
  const hasPermission = await requestFilePermission(handle);
  if (!hasPermission) {
    throw new Error("Permission denied");
  }

  // Store the handle
  await storeFileHandle(handle);

  return {
    handle,
    fileName: handle.name,
  };
};
