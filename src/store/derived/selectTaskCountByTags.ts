import { createSelector } from "@reduxjs/toolkit";
import { selectAllTasks } from "../tasks";
import { selectActiveGroupId } from "../ui";

export const selectTaskCountByTags = createSelector(
  [selectAllTasks, selectActiveGroupId],
  (allTasks, selectedGroupId) => {
    const count: Record<string, number> = { };

    allTasks
      .filter((task) => task.groupId === selectedGroupId)
      .forEach((task) => {
       task.tags.forEach(tagId => {
        count[tagId] = (count[tagId] ?? 0) + 1 ;
       })
      });

    return count;
  }
);
