import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { tasksAdapter } from "./tasksSlice";

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectAllTaskIds,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);

export const selectPendingTaskCountByGroup = createSelector(
  [selectAllTasks],
  (entities) => {
    const counts: Record<string, number> = {};

    for (const task of Object.values(entities)) {
      counts[task.groupId] =
        (counts[task.groupId] ?? 0) + (task.isDone ? 0 : 1);
    }

    return counts;
  }
);

export const selectTasksCount = createSelector([selectAllTasks], (entities) => {
  return entities.length;
});

export const selectCompletedTasksCount = createSelector(
  [selectAllTasks],
  (entities) => {
    return entities.filter((task) => task.isDone).length;
  }
);

export const selectMaxOrderFromTasks = createSelector(
  [selectAllTasks],
  (allTask) => {
    return Math.max(0, ...allTask.map((t) => t.order));
  }
);
