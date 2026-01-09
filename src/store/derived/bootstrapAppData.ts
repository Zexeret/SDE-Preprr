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
import { getLogger } from "../../logger";

const log = getLogger("app:bootstrap");

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
    log.info("Starting app bootstrap");

    // Initialize FileSaveManager singleton (must be done before any file save operations)
    createFileSaveManager(dispatch as AppDispatch, getState as () => RootState);

    // Hydrate App Data
    log.debug("Loading app state from IndexedDB");
    const localAppData = await loadAppStateFromIDB();
    if (localAppData) {
      log.debug("Hydrating app data with {} tasks", localAppData.tasks.length);
      await dispatch(hydrateAppData(localAppData));
    }

    // Hydrate File Backup Data
    log.debug("Loading file backup state");
    const fileBackupState: FileBackupState = await loadFileBackUpState();
    dispatch(setFileBackupState(fileBackupState));

    log.info("App bootstrap complete");
  }
);
