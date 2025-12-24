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
    setAllTags: tagsAdapter.setAll
  }
});


export const {
  addTag,
  updateTag,
  removeTag,
  setAllTags
} = tagsSlice.actions

export const tagsReducer =  tagsSlice.reducer ;


