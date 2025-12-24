import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { Group } from "../../model";

export const groupsAdapter = createEntityAdapter<Group>();

const groupsSlice = createSlice({
  name: "groups",
  initialState: groupsAdapter.getInitialState(),
  reducers: {
    addGroup: groupsAdapter.addOne,
    updateGroup: groupsAdapter.updateOne,
    removeGroup: groupsAdapter.removeOne,
    setAllGroups: groupsAdapter.setAll,
  },
});

export const { addGroup, updateGroup, removeGroup, setAllGroups } =
  groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
