import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { groupsAdapter } from "./groupsSlice";

export const {
  selectAll: selectAllGroups,
  selectById: selectGroupById,
  selectIds: selectAllGroupIds,
} = groupsAdapter.getSelectors((state: RootState) => state.groups);

export const selectCustomGroupsCount = createSelector(
  [selectAllGroups],
  (allGroups) => {
    return allGroups.filter((group) => group.isCustom).length;
  }
);

export const selectCustomGroups = createSelector(
  [selectAllGroups],
  (allGroups) => {
    return allGroups.filter((group) => group.isCustom);
  }
);
