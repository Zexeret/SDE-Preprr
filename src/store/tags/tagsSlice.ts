import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import type { Tag } from '../../model'


export const tagsAdapter = createEntityAdapter<Tag>();

const tagsSlice = createSlice({
  name: "tags",
  initialState: tagsAdapter.getInitialState(),
  reducers: {
    addTag: tagsAdapter.addOne,
    updateTag: tagsAdapter.updateOne,
    removeTag: tagsAdapter.removeOne,
    loadAllTag: tagsAdapter.setAll
  }
});


export const {
  addTag,
  updateTag,
  removeTag,
  loadAllTag
} = tagsSlice.actions

export const tagsReducer =  tagsSlice.reducer ;


