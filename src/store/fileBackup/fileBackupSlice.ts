import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_FILE_BACKUP_CONFIG, type SaveFrequency } from "../../model";

/**
 * State for file backup feature
 * When persisting to IndexedDB, we build FileBackupConfig from these fields
 */
export interface FileBackupState {
  readonly autoSaveEnabled: boolean;
  readonly saveFrequency: SaveFrequency;
  readonly periodicIntervalMinutes: number;
  readonly lastSavedAt: number | null;
  readonly fileName: string | null;

  // Connection state
  readonly hasPermission: boolean;
  readonly isConnected: boolean;
  readonly isSaving: boolean;
  readonly isLoading: boolean;
}

const initialState: FileBackupState = {
  ...DEFAULT_FILE_BACKUP_CONFIG,
  hasPermission: false,
  isConnected: false,
  isSaving: false,
  isLoading: false,
};

export const fileBackupSlice = createSlice({
  name: "fileBackup",
  initialState,
  reducers: {
    /** Set the entire file backup state (used during hydration) */
    setFileBackupState: (_, action: PayloadAction<FileBackupState>) => {
      return action.payload;
    },

    /** Set auto-save enabled */
    setAutoSaveEnabled: (state, action: PayloadAction<boolean>) => {
      state.autoSaveEnabled = action.payload;
    },

    /** Set save frequency */
    setSaveFrequency: (state, action: PayloadAction<SaveFrequency>) => {
      state.saveFrequency = action.payload;
    },

    /** Set periodic interval in minutes */
    setPeriodicInterval: (state, action: PayloadAction<number>) => {
      state.periodicIntervalMinutes = action.payload;
    },

    /** Update last saved timestamp */
    setLastSavedAt: (state, action: PayloadAction<number>) => {
      state.lastSavedAt = action.payload;
    },

    /** Connect to a file */
    connectFile: (
      state,
      action: PayloadAction<{
        readonly fileName: string;
        readonly hasPermission: boolean;
      }>
    ) => {
      state.fileName = action.payload.fileName;
      state.hasPermission = action.payload.hasPermission;
      state.isConnected = true;
    },

    /** Disconnect from file and reset to defaults */
    disconnectFile: (state) => {
      state.fileName = null;
      state.hasPermission = false;
      state.isConnected = false;
      state.autoSaveEnabled = DEFAULT_FILE_BACKUP_CONFIG.autoSaveEnabled;
      state.saveFrequency = DEFAULT_FILE_BACKUP_CONFIG.saveFrequency;
      state.periodicIntervalMinutes =
        DEFAULT_FILE_BACKUP_CONFIG.periodicIntervalMinutes;
      state.lastSavedAt = DEFAULT_FILE_BACKUP_CONFIG.lastSavedAt;
    },

    /** Update permission status */
    setHasPermission: (state, action: PayloadAction<boolean>) => {
      state.hasPermission = action.payload;
    },

    /** Set saving status */
    setIsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },

    /** Set loading status (for opening/importing files) */
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /** Trigger a manual save (handled by listener) */
    triggerManualSave: () => {
      // No state change - just a signal for the listener
    },
  },
});

export const {
  setFileBackupState,
  setAutoSaveEnabled,
  setSaveFrequency,
  setPeriodicInterval,
  setLastSavedAt,
  connectFile,
  disconnectFile,
  setHasPermission,
  setIsSaving,
  setIsLoading,
  triggerManualSave,
} = fileBackupSlice.actions;

export const fileBackupReducer = fileBackupSlice.reducer;
