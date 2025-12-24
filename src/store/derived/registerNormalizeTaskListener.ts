import { startAppListening } from "../listenerMiddleware";
import { normalizeTaskOrder, reorderTasks, selectAllTasks } from "../tasks";

export const registerNormalizeTaskListener = () => {
  /**
   * If the app is kept opened for a long time, we would need to ensure that
   * our re-ordering logic keeps entact. So if the difference between task's order becomes too less
   * we can re-render with order of all tasks updated.
   */
  startAppListening({
    actionCreator: reorderTasks,
    effect: (_, { getState, dispatch }) => {
      const tasks = selectAllTasks(getState()).sort(
        (a, b) => a.order - b.order
      );

      for (let i = 1; i < tasks.length; i++) {
        const gap = tasks[i].order - tasks[i - 1].order;
        if (gap < 1) {
          dispatch(normalizeTaskOrder());
          break;
        }
      }
    },
  });
};
