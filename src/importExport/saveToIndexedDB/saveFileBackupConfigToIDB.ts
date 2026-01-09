import type { FileBackupConfig } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { FILE_BACKUP_STORE, FILE_CONFIG_KEY } from "../types";
import { getLogger } from "../../logger";

const log = getLogger("idb:save-file-config");

// Store backup config in IndexedDB
export const saveFileBackupConfigToIDB = async (
  config: FileBackupConfig
): Promise<void> => {
  log.debug("saveFileBackupConfigToIDB() called");
  try {
    log.debug("Getting IndexedDB instance...");
    const db = await getIndexedDb();
    log.debug("Writing file backup config to store: {}", FILE_BACKUP_STORE);
    await db.put(FILE_BACKUP_STORE, config, FILE_CONFIG_KEY);
    log.info("File backup config stored in IndexedDB");
  } catch (error) {
    log.error("Failed to store file backup config: {}", error);
  }
};
