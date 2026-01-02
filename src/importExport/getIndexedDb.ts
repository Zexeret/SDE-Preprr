import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import {
  APP_STATE_STORE,
  DB_NAME,
  DB_VERSION,
  FILE_BACKUP_STORE,
  type AppStateStoreValue,
  type FileBackupStoreValue,
} from "./types";

interface AppDB extends DBSchema {
  readonly [APP_STATE_STORE]: {
    readonly key: string;
    readonly value: AppStateStoreValue;
  };
  readonly [FILE_BACKUP_STORE]: {
    readonly key: string;
    readonly value: FileBackupStoreValue;
  };
}

let dbPromise: Promise<IDBPDatabase<AppDB>>;

export function getIndexedDb() {
  if (!dbPromise) {
    dbPromise = openDB<AppDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        // Version 1: Create appState store
        if (oldVersion < 1) {
          if (!db.objectStoreNames.contains(APP_STATE_STORE)) {
            db.createObjectStore(APP_STATE_STORE);
          }
        }

        // Version 2: Create fileBackup store
        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains(FILE_BACKUP_STORE)) {
            db.createObjectStore(FILE_BACKUP_STORE);
          }
        }
      },
    });
  }
  return dbPromise;
}
