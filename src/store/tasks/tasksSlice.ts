import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import type { PreparationTask } from '../../model'


export const tasksAdapter = createEntityAdapter<PreparationTask>();

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    addTask: tasksAdapter.addOne,
    updateTask: tasksAdapter.updateOne,
    removeTask: tasksAdapter.removeOne,
    loadAllTasks: tasksAdapter.setAll
  }
});


export const {
  addTask,
  updateTask,
  removeTask,
  loadAllTasks
} = tasksSlice.actions

export const tasksReducer =  tasksSlice.reducer ;


