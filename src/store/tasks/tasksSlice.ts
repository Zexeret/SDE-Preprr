import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { PreparationTask } from "../../model";
import { removeTag } from "../tags";

export const tasksAdapter = createEntityAdapter<PreparationTask>();

export const ORDER_SEPARATOR_BASE = 1000000;

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    addTask: tasksAdapter.addOne,
    updateTask: tasksAdapter.updateOne,
    removeTask: tasksAdapter.removeOne,
    setAllTasks: tasksAdapter.setAll,
    reorderTasks: (
      state,
      action: PayloadAction<{
        readonly activeId: string;
        readonly overId: string;
      }>
    ) => {
      const { activeId, overId } = action.payload;

      if (activeId === overId) return;

      const tasks = Object.values(state.entities).sort(
        (a, b) => a.order - b.order
      );

      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      if (activeIndex === -1 || overIndex === -1) return;

      const activeTask = tasks[activeIndex];

      // Remove active task temporarily
      tasks.splice(activeIndex, 1);

      // Insert at new position
      tasks.splice(overIndex, 0, activeTask);

      const before = tasks[overIndex - 1];
      const after = tasks[overIndex + 1];

      let newOrder: number;

      if (before && after) {
        newOrder = (before.order + after.order) / 2;
      } else if (before) {
        newOrder = before.order + ORDER_SEPARATOR_BASE;
      } else if (after) {
        newOrder = after.order - ORDER_SEPARATOR_BASE;
      } else {
        newOrder = ORDER_SEPARATOR_BASE;
      }

      // Update only the dragged task
      activeTask.order = newOrder;
      activeTask.updatedAt = Date.now();
    },
    normalizeTaskOrder(state) {
      const tasks = Object.values(state.entities)
        .filter(Boolean)
        .sort((a, b) => a.order - b.order);

      tasks.forEach((task, index) => {
        task.order = index * ORDER_SEPARATOR_BASE;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeTag, (state, action) => {
      const removedTagId = action.payload;

      Object.values(state.entities).forEach((task) => {
        if (!task) return;

        if (task.tags.includes(removedTagId)) {
          task.tags = task.tags.filter((tagId) => tagId !== removedTagId);
          task.updatedAt = Date.now();
        }
      });
    });
  },
});

export const {
  addTask,
  updateTask,
  removeTask,
  setAllTasks,
  reorderTasks,
  normalizeTaskOrder,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
