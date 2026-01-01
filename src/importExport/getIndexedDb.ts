import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { ExportWrapper } from "./types";

const DB_NAME = "sde-preper-db";
export const STORE_NAME = "appState";
const DB_VERSION = 1;

interface AppDB extends DBSchema {
  readonly [STORE_NAME]: {
    readonly key: string;
    readonly value: ExportWrapper; // storing the full appState with checksum and versions
  };
}

let dbPromise: Promise<IDBPDatabase<AppDB>>;

export function getIndexedDb() {
  if (!dbPromise) {
    dbPromise = openDB<AppDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
}