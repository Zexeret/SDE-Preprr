import { isAnyOf } from "@reduxjs/toolkit";
import { startAppListening } from "../listenerMiddleware";
import { CURRENT_MODEL_VERSION, type AppState } from "../../model";
import {
  addTask,
  removeTask,
  selectAllTasks,
  setAllTasks,
  updateTask,
} from "../tasks";
import { addTag, removeTag, selectCustomTags, updateTag } from "../tags";
import {
  addGroup,
  removeGroup,
  selectCustomGroups,
  updateGroup,
} from "../groups";
import { selectThemename, setThemeName } from "../ui";
import { saveToLocalStorage } from "../../importExport";


export const registerSaveDataListener = () => {
  // Save the data
  startAppListening({
    matcher: isAnyOf(
      addTask,
      updateTask,
      removeTask,
      setAllTasks,
      addGroup,
      updateGroup,
      removeGroup,
      addTag,
      updateTag,
      removeTag,
      setThemeName
    ),
    effect: async (_, listenerApi) => {
      // Cancel any pending save
      listenerApi.cancelActiveListeners();

      // Debounce (wait 500ms of silence)
      await listenerApi.delay(1000);
      
      const state = listenerApi.getState();

      const appState: AppState = {
        version: CURRENT_MODEL_VERSION,
        tasks: selectAllTasks(state),
        customTags: selectCustomTags(state),
        customGroups: selectCustomGroups(state),
        selectedTheme: selectThemename(state),
        exportedAt: Date.now(),
      };
      saveToLocalStorage(appState);
      console.log("Auto-saved app state");
    },
  });
};
