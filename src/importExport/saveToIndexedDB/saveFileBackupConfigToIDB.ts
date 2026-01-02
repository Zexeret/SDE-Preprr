import type { FileBackupConfig } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { FILE_BACKUP_STORE, FILE_CONFIG_KEY } from "../types";

// Store backup config in IndexedDB
export const saveFileBackupConfigToIDB = async (
  config: FileBackupConfig
): Promise<void> => {
  try {
    const db = await getIndexedDb();
    await db.put(FILE_BACKUP_STORE, config, FILE_CONFIG_KEY);
    console.log("File backup config stored in IndexedDB");
  } catch (error) {
    console.error("Failed to store file backup config:", error);
  }
};