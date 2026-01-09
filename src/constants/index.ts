/**
 * Centralized constants for the application
 * Single source of truth for magic numbers and configuration values
 */

// ============================================
// TIMING CONSTANTS (in milliseconds)
// ============================================

/** Debounce delay for auto-save operations */
export const AUTO_SAVE_DEBOUNCE_MS = 1000;

/** Debounce delay for file save after IndexedDB save */
export const FILE_SAVE_DEBOUNCE_MS = 1000;

/** Debounce delay for persisting file backup config */
export const CONFIG_PERSIST_DEBOUNCE_MS = 1000;

// ============================================
// INDEXEDDB CONSTANTS
// ============================================

/** IndexedDB database name */
export const IDB_DATABASE_NAME = "sde-preprr-db";

/** IndexedDB database version */
export const IDB_DATABASE_VERSION = 1;

/** Store name for app state */
export const IDB_APP_STATE_STORE = "appState";

/** Store name for file backup data */
export const IDB_FILE_BACKUP_STORE = "fileBackup";

/** Key for app state in store */
export const IDB_APP_STATE_KEY = "currentState";

/** Key for file handle in file backup store */
export const IDB_FILE_HANDLE_KEY = "fileHandle";

/** Key for file config in file backup store */
export const IDB_FILE_CONFIG_KEY = "fileConfig";

// ============================================
// LOCAL STORAGE CONSTANTS
// ============================================

/** LocalStorage key for app state (deprecated) */
export const LOCAL_STORAGE_APP_STATE_KEY = "sde-preprr-app-state";

// ============================================
// FILE CONSTANTS
// ============================================

/** Default file extension for exports */
export const EXPORT_FILE_EXTENSION = ".json";

/** Default file name prefix for exports */
export const EXPORT_FILE_PREFIX = "sde-preprr-save";

/** Default file name prefix for backups */
export const BACKUP_FILE_PREFIX = "sde-preprr-backup";

/** MIME type for export files */
export const EXPORT_MIME_TYPE = "application/json";

// ============================================
// TASK ORDERING CONSTANTS
// ============================================

/** Base value for task order separation */
export const TASK_ORDER_SEPARATOR_BASE = 1000000;

// ============================================
// UI CONSTANTS
// ============================================

/** Default periodic backup interval in minutes */
export const DEFAULT_PERIODIC_INTERVAL_MINUTES = 5;

// ============================================
// VALIDATION CONSTANTS
// ============================================

/** Minimum supported model version for migration */
export const MIN_SUPPORTED_VERSION = 1;
