import type { FileBackupConfig } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { FILE_BACKUP_STORE, FILE_CONFIG_KEY } from "../types";
import { getLogger } from "../../logger";

const log = getLogger("idb:load-file-config");

// Retrieve backup config from IndexedDB
export const loadFileBackupConfigFromIDB =
  async (): Promise<FileBackupConfig | null> => {
    log.debug("loadFileBackupConfigFromIDB() called");
    try {
      log.debug("Getting IndexedDB instance...");
      const db = await getIndexedDb();
      log.debug(
        "Reading from store: {}, key: {}",
        FILE_BACKUP_STORE,
        FILE_CONFIG_KEY
      );
      const config = await db.get(FILE_BACKUP_STORE, FILE_CONFIG_KEY);
      if (config && "autoSaveEnabled" in config) {
        log.info("File backup config loaded from IndexedDB");
        log.debug(
          "Config - autoSave: {}, frequency: {}",
          config.autoSaveEnabled,
          config.saveFrequency
        );
        return config as FileBackupConfig;
      }
      log.debug("No file backup config found in IndexedDB");
      return null;
    } catch (error) {
      log.error("Failed to retrieve file backup config: {}", error);
      return null;
    }
  };
