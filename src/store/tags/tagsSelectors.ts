import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { tagsAdapter } from "./tagsSlice";

export const {
  selectAll: selectAllTags,
  selectById: selectTagById,
  selectIds: selectAllTagIds,
} = tagsAdapter.getSelectors((state: RootState) => state.tags);

export const selectCustomTagsCount = createSelector(
  [selectAllTags],
  (allTags) => {
    return allTags.filter((tag) => tag.isCustom).length;
  }
);

export const selectCustomTags = createSelector([selectAllTags], (allTags) => {
  return allTags.filter((tag) => tag.isCustom);
});
