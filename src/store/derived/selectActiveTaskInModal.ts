import { createSelector } from "@reduxjs/toolkit";
import { selectAllTasks } from "../tasks";
import { selectTaskIdInModal } from "../ui";

export const selectActiveTaskInModal = createSelector(
  [selectAllTasks, selectTaskIdInModal],
  (allTasks, activeTaskInModalId) => {
    return allTasks.find((task) => task.id === activeTaskInModalId) ?? null;
  }
);
