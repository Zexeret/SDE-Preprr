import type { FileBackupConfig } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { FILE_BACKUP_STORE, FILE_CONFIG_KEY } from "../types";

// Retrieve backup config from IndexedDB
export const loadFileBackupConfigFromIDB =
  async (): Promise<FileBackupConfig | null> => {
    try {
      const db = await getIndexedDb();
      const config = await db.get(FILE_BACKUP_STORE, FILE_CONFIG_KEY);
      if (config && "autoSaveEnabled" in config) {
        return config as FileBackupConfig;
      }
      return null;
    } catch (error) {
      console.error("Failed to retrieve file backup config:", error);
      return null;
    }
  };