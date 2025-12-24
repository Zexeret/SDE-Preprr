import type { RootState } from "../store";

export const selectUI = (state: RootState) => state.ui;

export const selectIsTaskModalOpen = (state: RootState) => state.ui.taskModal.isOpen;
export const selectIsGroupModalOpen = (state: RootState) => state.ui.groupModal.isOpen;

export const selectTaskIdInModal = (state: RootState) => state.ui.taskModal.taskId;
export const selectGroupIdInModal = (state: RootState) => state.ui.groupModal.groupId;

export const selectModeInTaskModal = (state : RootState) => state.ui.taskModal.mode;

export const selectThemename = (state: RootState) => state.ui.selectedTheme;

export const selectActiveGroupId = (state: RootState) => state.ui.selectedGroupId ;

export const selectActiveFilters = (state: RootState) => state.ui.filter;

export const selectDifficultyFilter = (state: RootState) => state.ui.filter.difficulties;
export const selectTagIdsFilter = (state: RootState) => state.ui.filter.tagIds;
export const selectShowTagFilter = (state : RootState) => state.ui.filter.showTags;
export const selectShowDifficultyFilter = (state : RootState) => state.ui.filter.showDifficulty;
