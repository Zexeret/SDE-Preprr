import { createSelector } from "@reduxjs/toolkit";
import { selectGroupIdInModal } from "../ui";
import { selectAllGroups } from "../groups";

export const selectActiveGroupInModal = createSelector(
  [selectAllGroups, selectGroupIdInModal],
  (allGroups, activeGroupIdInModal) => {
    return allGroups.find((group) => group.id === activeGroupIdInModal) ?? null;
  }
);
