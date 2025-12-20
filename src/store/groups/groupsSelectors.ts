import type { RootState } from "../store";
import { groupsAdapter } from "./groupsSlice";

export const {
  selectAll: selectAllGroups,
  selectById: selectGroupById,
  selectIds: selectAllGroupIds
} = groupsAdapter.getSelectors((state: RootState) => state.groups);