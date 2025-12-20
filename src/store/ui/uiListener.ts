import { startAppListening } from "../listenerMiddleware";
import { setSelectedGroupId, resetFilters } from "./uiSlice";

export function registerUIListeners() {
  // Reset all the filters whenever the selected groupId changes
  startAppListening({
    actionCreator: setSelectedGroupId,
    effect: async (_, { dispatch }) => {
      dispatch(resetFilters());
    },
  });
}