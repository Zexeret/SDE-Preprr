/**
 * File Connection Management
 *
 * High-level functions for connecting, disconnecting, and verifying file handles.
 */

import { DEFAULT_FILE_BACKUP_CONFIG } from "../model";
import { saveFileBackupConfigToIDB } from "../importExport/saveToIndexedDB";
import { getLogger } from "../logger";
import {
  getStoredFileHandle,
  removeStoredFileHandle,
  storeFileHandle,
} from "./handleStorage";
import { requestFilePermission } from "./permissions";
import { openFilePicker, createFilePicker } from "./filePicker";

const log = getLogger("file:connection");

/**
 * Verify if stored handle is still valid and has permission
 */
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

/**
 * Disconnect file (remove handle and reset config)
 */
export const disconnectFile = async (): Promise<void> => {
  log.debug("disconnectFile() called");
  await removeStoredFileHandle();
  await saveFileBackupConfigToIDB(DEFAULT_FILE_BACKUP_CONFIG);
  log.info("File disconnected");
};

/**
 * Connect to a file (either open existing or create new)
 */
export const connectToFile = async (
  mode: "open" | "create"
): Promise<{
  readonly handle: FileSystemFileHandle;
  readonly fileName: string;
} | null> => {
  log.debug("connectToFile() called with mode: {}", mode);

  const handle =
    mode === "open" ? await openFilePicker() : await createFilePicker();

  if (!handle) {
    log.debug("No file selected");
    return null;
  }

  // Request permission
  const granted = await requestFilePermission(handle);
  if (!granted) {
    log.error("Permission denied for file: {}", handle.name);
    throw new Error("Permission denied");
  }

  // Store the handle
  await storeFileHandle(handle);

  log.info("Connected to file: {}", handle.name);
  return {
    handle,
    fileName: handle.name,
  };
};
