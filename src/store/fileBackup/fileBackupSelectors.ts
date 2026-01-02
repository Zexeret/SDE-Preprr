import type { FileBackupConfig, SaveFrequency } from "../../model";
import type { RootState } from "../store";
import type { FileBackupState } from "./fileBackupSlice";

/** Select the entire file backup state */
export const selectFileBackupState = (state: RootState): FileBackupState =>
  state.fileBackup;

/** Build FileBackupConfig object for persistence to IndexedDB */
export const selectFileBackupConfig = (state: RootState): FileBackupConfig => ({
  autoSaveEnabled: state.fileBackup.autoSaveEnabled,
  saveFrequency: state.fileBackup.saveFrequency,
  periodicIntervalMinutes: state.fileBackup.periodicIntervalMinutes,
  lastSavedAt: state.fileBackup.lastSavedAt,
  fileName: state.fileBackup.fileName,
});

export const selectIsFileConnected = (state: RootState): boolean =>
  state.fileBackup.isConnected;

export const selectFileName = (state: RootState): string | null =>
  state.fileBackup.fileName;

export const selectHasFilePermission = (state: RootState): boolean =>
  state.fileBackup.hasPermission;

export const selectIsFileSaving = (state: RootState): boolean =>
  state.fileBackup.isSaving;

export const selectIsFileLoading = (state: RootState): boolean =>
  state.fileBackup.isLoading;

export const selectIsAutoSaveEnabled = (state: RootState): boolean =>
  state.fileBackup.autoSaveEnabled;

export const selectSaveFrequency = (state: RootState): SaveFrequency =>
  state.fileBackup.saveFrequency;

export const selectPeriodicInterval = (state: RootState): number =>
  state.fileBackup.periodicIntervalMinutes;

export const selectLastSavedAt = (state: RootState): number | null =>
  state.fileBackup.lastSavedAt;
