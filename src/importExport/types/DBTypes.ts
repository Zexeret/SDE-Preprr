import type { FileBackupConfig } from "../../model";
import type { ExportWrapper } from "./ExportTypes";

// Database name and version
export const DB_NAME = "sde-preper-db";
export const DB_VERSION = 2;

// Store names
export const APP_STATE_STORE = "appState";
export const FILE_BACKUP_STORE = "fileBackup";

// Store keys
export const APP_STATE_KEY = "current";
export const FILE_HANDLE_KEY = "handle";
export const FILE_CONFIG_KEY = "config";

// Union type for file backup store values
export type FileBackupStoreValue = FileSystemFileHandle | FileBackupConfig;

// Type for app state store value
export type AppStateStoreValue = ExportWrapper;
