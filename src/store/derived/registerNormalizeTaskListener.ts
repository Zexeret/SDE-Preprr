import { startAppListening } from "../listenerMiddleware";
import { normalizeTaskOrder, reorderTasks, selectAllTasks } from "../tasks";
import { getLogger } from "../../logger";

const log = getLogger("store:normalize-task");

export const registerNormalizeTaskListener = () => {
  log.debug("Registering normalize task listener");

  /**
   * If the app is kept opened for a long time, we would need to ensure that
   * our re-ordering logic keeps entact. So if the difference between task's order becomes too less
   * we can re-render with order of all tasks updated.
   */
  startAppListening({
    actionCreator: reorderTasks,
    effect: (_, { getState, dispatch }) => {
      log.debug("Checking task order gaps after reorder");
      const tasks = selectAllTasks(getState()).sort(
        (a, b) => a.order - b.order
      );

      for (let i = 1; i < tasks.length; i++) {
        const gap = tasks[i].order - tasks[i - 1].order;
        if (gap < 1) {
          log.info(
            "Task order gap too small ({}), normalizing all task orders",
            gap
          );
          dispatch(normalizeTaskOrder());
          break;
        }
      }
    },
  });

  log.debug("Normalize task listener registered");
};
