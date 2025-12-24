import { createSelector } from "@reduxjs/toolkit";
import { selectAllTasks } from "../tasks";
import { selectActiveGroupId  } from "../ui";
import type { DifficultyTagId } from "../../model";



export const selectTaskCountByDifficulty = createSelector(
  [selectAllTasks, selectActiveGroupId],
  (allTasks, selectedGroupId) => {
    const count: Record<DifficultyTagId, number> = {
        'EASY': 0,
        'MEDIUM':0,
        'HARD': 0
    };

    allTasks
      .filter((task) => task.groupId === selectedGroupId)
      .forEach((task) => {
        count[task.difficulty] += 1;
      });

    return count;
  }
);
