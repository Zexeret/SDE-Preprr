import { createAsyncThunk } from "@reduxjs/toolkit";
import { hydrateAppData } from "./hydrateAppData";
import {
  loadAppStateFromIDB,
  loadFileBackupConfigFromIDB,
  verifyStoredHandle,
} from "../../importExport";
import {
  setFileBackupState,
  createFileSaveManager,
  type FileBackupState,
} from "../fileBackup";
import { DEFAULT_FILE_BACKUP_CONFIG } from "../../model";
import type { RootState, AppDispatch } from "../store";

const loadFileBackUpState = async (): Promise<FileBackupState> => {
  const storedConfig = await loadFileBackupConfigFromIDB();
  const config = storedConfig ?? DEFAULT_FILE_BACKUP_CONFIG;
  const { handle, hasPermission, fileName } = await verifyStoredHandle();

  return {
    autoSaveEnabled: config.autoSaveEnabled,
    saveFrequency: config.saveFrequency,
    periodicIntervalMinutes: config.periodicIntervalMinutes,
    lastSavedAt: config.lastSavedAt,
    fileName: handle ? fileName : null,
    hasPermission: handle ? hasPermission : false,
    isConnected: !!handle,
    isSaving: false,
    isLoading: false,
  };
};

export const bootstrapAppData = createAsyncThunk(
  "app/bootstrap",
  async (_, { dispatch, getState }) => {
    // Initialize FileSaveManager singleton (must be done before any file save operations)
    createFileSaveManager(dispatch as AppDispatch, getState as () => RootState);

    // Hydrate App Data
    const localAppData = await loadAppStateFromIDB();
    if (localAppData) {
      await dispatch(hydrateAppData(localAppData));
    }

    // Hydrate File Backup Data
    const fileBackupState: FileBackupState = await loadFileBackUpState();
    dispatch(setFileBackupState(fileBackupState));
  }
);
