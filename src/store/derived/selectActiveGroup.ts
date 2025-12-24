import { createSelector } from "@reduxjs/toolkit";
import { selectAllGroups } from "../groups";
import { selectActiveGroupId } from "../ui";

export const selectActiveGroup = createSelector(
  [selectAllGroups, selectActiveGroupId],
  (allGroups, selectedGroupId) => {
    return allGroups.find((group) => group.id === selectedGroupId) ?? null;
  }
);
