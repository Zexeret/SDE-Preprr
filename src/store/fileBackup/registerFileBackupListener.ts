import { isAnyOf } from "@reduxjs/toolkit";
import { startAppListening } from "../listenerMiddleware";
import {
  connectFile,
  disconnectFile,
  setAutoSaveEnabled,
  setFileBackupState,
  setHasPermission,
  setLastSavedAt,
  setPeriodicInterval,
  setSaveFrequency,
  triggerManualSave,
} from "./fileBackupSlice";
import { selectFileBackupConfig } from "./fileBackupSelectors";
import {
  disconnectFile as disconnectFileService,
  saveFileBackupConfigToIDB,
} from "../../importExport";
import { getFileSaveManager } from "./FileSaveManager";

/**
 * Matcher for all file backup actions that should trigger a config save
 */
const fileBackupConfigMatcher = isAnyOf(
  setFileBackupState,
  setAutoSaveEnabled,
  setSaveFrequency,
  setPeriodicInterval,
  setLastSavedAt,
  connectFile,
  disconnectFile,
  setHasPermission
);

/**
 * Registers all file backup listeners:
 * 1. Persists config changes to IndexedDB
 * 2. Manages periodic save interval based on settings
 * 3. Handles manual save triggers
 */
export const registerFileBackupListener = () => {
  // Persist config changes to IndexedDB
  startAppListening({
    matcher: fileBackupConfigMatcher,
    effect: async (_, listenerApi) => {
      listenerApi.cancelActiveListeners();
      await listenerApi.delay(1000);

      const state = listenerApi.getState();
      const config = selectFileBackupConfig(state);

      await saveFileBackupConfigToIDB(config);
      console.log("File backup config persisted to IndexedDB");
    },
  });

  // Update periodic save when state is hydrated or settings change
  startAppListening({
    matcher: isAnyOf(
      setFileBackupState,
      setAutoSaveEnabled,
      setSaveFrequency,
      setPeriodicInterval
    ),
    effect: () => {
      getFileSaveManager().updatePeriodicSave();
    },
  });

  // Stop periodic save and clear stored handle on disconnect
  startAppListening({
    actionCreator: disconnectFile,
    effect: async () => {
      getFileSaveManager().stopPeriodicSave();
      await disconnectFileService();
    },
  });

  // Handle manual save trigger
  startAppListening({
    actionCreator: triggerManualSave,
    effect: async () => {
      await getFileSaveManager().performFileSaveNow();
    },
  });
};
