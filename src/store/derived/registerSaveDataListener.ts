import { isAnyOf } from "@reduxjs/toolkit";
import { startAppListening } from "../listenerMiddleware";
import {
  addTask,
  removeTask,
  reorderTasks,
  setAllTasks,
  updateTask,
} from "../tasks";
import { addTag, removeTag, updateTag } from "../tags";
import { addGroup, removeGroup, updateGroup } from "../groups";
import { setThemeName } from "../ui";
import { saveAppStateToIDB } from "../../importExport";
import { buildAppStateForExport } from "./selectAppStateForExport";
import { getFileSaveManager } from "../fileBackup";
import { getLogger } from "../../logger";

const log = getLogger("store:auto-save");

/**
 * Matcher for all actions that should trigger a save
 */
export const saveDataMatcher = isAnyOf(
  addTask,
  updateTask,
  removeTask,
  reorderTasks,
  setAllTasks,
  addGroup,
  updateGroup,
  removeGroup,
  addTag,
  updateTag,
  removeTag,
  setThemeName
);

export const registerSaveDataListener = () => {
  log.debug("Registering auto-save data listener");

  startAppListening({
    matcher: saveDataMatcher,
    effect: async (action, listenerApi) => {
      log.debug("Data change detected: {}", action.type);

      // Cancel any pending save
      listenerApi.cancelActiveListeners();

      // Debounce (wait 1 second of silence)
      log.debug("Debouncing save for 1 second...");
      await listenerApi.delay(1000);

      const state = listenerApi.getState();
      const appState = buildAppStateForExport(state);

      // Save to IndexedDB
      log.debug("Saving app state to IndexedDB...");
      await saveAppStateToIDB(appState);
      log.info("Auto-saved app state to IndexedDB");

      // Save to file if enabled
      log.debug("Checking if file save is enabled...");
      getFileSaveManager().saveToFileIfEnabled();
    },
  });
};
