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
import { getLogger } from "../../logger";

const log = getLogger("file:backup-listener");

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
  log.debug("Registering file backup listeners");

  // Persist config changes to IndexedDB
  startAppListening({
    matcher: fileBackupConfigMatcher,
    effect: async (action, listenerApi) => {
      log.debug("File backup config action received: {}", action.type);
      listenerApi.cancelActiveListeners();
      await listenerApi.delay(1000);

      const state = listenerApi.getState();
      const config = selectFileBackupConfig(state);

      log.debug("Persisting file backup config to IndexedDB...");
      await saveFileBackupConfigToIDB(config);
      log.info("File backup config persisted to IndexedDB");
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
    effect: (action) => {
      log.debug("Periodic save settings changed: {}", action.type);
      getFileSaveManager().updatePeriodicSave();
    },
  });

  // Stop periodic save and clear stored handle on disconnect
  startAppListening({
    actionCreator: disconnectFile,
    effect: async () => {
      log.info("Disconnecting from file...");
      getFileSaveManager().stopPeriodicSave();
      await disconnectFileService();
      log.info("File disconnected and handle cleared");
    },
  });

  // Handle manual save trigger
  startAppListening({
    actionCreator: triggerManualSave,
    effect: async () => {
      log.info("Manual save triggered");
      await getFileSaveManager().performFileSaveNow();
    },
  });
};
