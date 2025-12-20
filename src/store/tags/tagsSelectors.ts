import type { RootState } from "../store";
import { tagsAdapter } from "./tagsSlice";

export const {
  selectAll: selectAllTags,
  selectById: selectTagById,
  selectIds: selectAllTagIds
} = tagsAdapter.getSelectors((state: RootState) => state.tags);