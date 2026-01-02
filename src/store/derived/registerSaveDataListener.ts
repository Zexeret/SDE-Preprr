import { isAnyOf } from "@reduxjs/toolkit";
import { startAppListening } from "../listenerMiddleware";
import { addTask, removeTask, reorderTasks, setAllTasks, updateTask } from "../tasks";
import { addTag, removeTag, updateTag } from "../tags";
import { addGroup, removeGroup, updateGroup } from "../groups";
import { setThemeName } from "../ui";
import { saveAppStateToIDB } from "../../importExport";
import { buildAppStateForExport } from "./selectAppStateForExport";
import { getFileSaveManager } from "../fileBackup";

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
  startAppListening({
    matcher: saveDataMatcher,
    effect: async (_, listenerApi) => {
      // Cancel any pending save
      listenerApi.cancelActiveListeners();

      // Debounce (wait 1 second of silence)
      await listenerApi.delay(1000);

      const state = listenerApi.getState();
      const appState = buildAppStateForExport(state);

      // Save to IndexedDB
      await saveAppStateToIDB(appState);
      console.log("Auto-saved app state to IndexedDB");

      // Save to file if enabled
      getFileSaveManager().saveToFileIfEnabled();
    },
  });
};
