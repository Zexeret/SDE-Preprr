import type { RootState } from "../store";
import { tasksAdapter } from "./tasksSlice";

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectAllTaskIds
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);