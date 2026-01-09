import { getLogger } from "../../logger";
import { startAppListening } from "../listenerMiddleware";
import { setSelectedGroupId, resetFilters } from "./uiSlice";

const log = getLogger("store:ui-listener");

export function registerUIListeners() {
  log.debug("Registering UI listeners");
  // Reset all the filters whenever the selected groupId changes
  startAppListening({
    actionCreator: setSelectedGroupId,
    effect: async (_, { dispatch }) => {
      dispatch(resetFilters());
    },
  });
  log.debug("UI listeners registered");
}