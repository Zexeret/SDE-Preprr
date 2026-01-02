import { createSelector } from "@reduxjs/toolkit";
import { CURRENT_MODEL_VERSION, type AppState } from "../../model";
import { selectAllTasks } from "../tasks";
import { selectCustomTags } from "../tags";
import { selectCustomGroups } from "../groups";
import { selectThemename } from "../ui";
import type { RootState } from "../store";

/**
 * Selector that builds the AppState for export/save operations.
 * This is the single source of truth for building export data.
 */
export const selectAppStateForExport = createSelector(
  [selectAllTasks, selectCustomTags, selectCustomGroups, selectThemename],
  (tasks, customTags, customGroups, selectedTheme): AppState => ({
    version: CURRENT_MODEL_VERSION,
    tasks,
    customTags,
    customGroups,
    selectedTheme,
    exportedAt: Date.now(),
  })
);

export const buildAppStateForExport = (state: RootState): AppState => ({
  version: CURRENT_MODEL_VERSION,
  tasks: selectAllTasks(state),
  customTags: selectCustomTags(state),
  customGroups: selectCustomGroups(state),
  selectedTheme: selectThemename(state),
  exportedAt: Date.now(),
});
