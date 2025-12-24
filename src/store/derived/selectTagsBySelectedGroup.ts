import { createSelector } from "@reduxjs/toolkit";
import { selectAllTags } from "../tags";
import { selectActiveGroupId } from "../ui";

export const selectTagsBySelectedGroup = createSelector(
  [selectAllTags, selectActiveGroupId],
  (allTags, selectedGroupId) => {
    return allTags.filter(({ groupId }) =>
      groupId ? groupId === selectedGroupId : true
    );
  }
);
