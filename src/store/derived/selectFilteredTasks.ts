import { createSelector } from "@reduxjs/toolkit";
import { selectAllTasks } from "../tasks";
import { selectActiveFilters, selectActiveGroupId, type UIState } from "../ui";
import type { PreparationTask } from "../../model";

const matchesTag = (
  filterTags: UIState["filter"]["tagIds"],
  task: PreparationTask
) => {
  if (filterTags.length === 0) return true;
  return task.tags.some((tag) => filterTags.includes(tag));
};

const matchesDifficulty = (
  filterDifficulties: UIState["filter"]["difficulties"],
  task: PreparationTask
) => {
  if (filterDifficulties.length === 0) return true;
  return filterDifficulties.some(
    (difficulty) => task.difficulty === difficulty
  );
};

const matchesCompletionStatus = (
  filterCompletionStatus: UIState["filter"]["completionStatus"],
  task: PreparationTask
) => {
  return filterCompletionStatus === "All"
    ? true
    : filterCompletionStatus === "Done"
    ? task.isDone
    : !task.isDone;
};

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectActiveGroupId, selectActiveFilters],
  (allTasks, selectedGroupId, currentFilter) => {
    return allTasks
      .filter((task) => task.groupId === selectedGroupId)
      .filter((task) => matchesTag(currentFilter.tagIds, task))
      .filter((task) => matchesDifficulty(currentFilter.difficulties, task))
      .filter((task) =>
        matchesCompletionStatus(currentFilter.completionStatus, task)
      );
  }
);

export const selectOrderedFilteredTaskIds = createSelector(
  [selectFilteredTasks],
  (allFilteredTasks) => {
    return allFilteredTasks
      .slice() // avoid mutating selector output
      .sort((a, b) => a.order - b.order)
      .map((task) => task.id);
  }
);
