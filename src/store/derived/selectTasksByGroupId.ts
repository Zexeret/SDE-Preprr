import { createSelector } from "@reduxjs/toolkit";
import { selectAllTasks } from "../tasks";
import { selectActiveGroupId } from "../ui";

export const selectTasksByGroupId = createSelector(
    [selectAllTasks, selectActiveGroupId],
    (allTasks, selectedGroupId) => {
        return allTasks.filter(task => task.groupId === selectedGroupId);
    }
)