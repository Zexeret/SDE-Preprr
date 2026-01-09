import { getIndexedDb } from "../importExport/getIndexedDb";
import { FILE_BACKUP_STORE, FILE_HANDLE_KEY } from "../importExport/types";
import { getLogger } from "../logger";

const log = getLogger("file:handle-storage");

/**
 * Store file handle in IndexedDB
 */
export const storeFileHandle = async (
  handle: FileSystemFileHandle
): Promise<void> => {
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

/**
 * Retrieve file handle from IndexedDB
 */
export const getStoredFileHandle =
  async (): Promise<FileSystemFileHandle | null> => {
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

/**
 * Remove file handle from IndexedDB
 */
export const removeStoredFileHandle = async (): Promise<void> => {
  log.debug("removeStoredFileHandle() called");
  try {
    const db = await getIndexedDb();
    await db.delete(FILE_BACKUP_STORE, FILE_HANDLE_KEY);
    log.info("File handle removed from IndexedDB");
  } catch (error) {
    log.error("Failed to remove file handle: {}", error);
  }
};
