import { createSelector } from "@reduxjs/toolkit";
import { selectAllTasks } from "../tasks";
import { selectActiveGroupId, type TaskCompletionStatus } from "../ui";

export const selectTaskCountByCompletionStatus = createSelector(
  [selectAllTasks, selectActiveGroupId],
  (allTasks, selectedGroupId) => {
    const count: Record<TaskCompletionStatus, number> = {
      All: 0,
      Done: 0,
      Pending: 0,
    };

    allTasks
      .filter((task) => task.groupId === selectedGroupId)
      .forEach((task) => {
        if (task.isDone) count["Done"] += 1;
        else count["Pending"] += 1;

        count["All"] += 1;
      });

    return count;
  }
);
