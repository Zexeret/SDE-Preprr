import { getDefaultAppState, type AppState } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { deserializeToAppState } from "../serialization";
import { APP_STATE_KEY, APP_STATE_STORE } from "../types";
import { getLogger } from "../../logger";

const log = getLogger("idb:load-app-state");

export const loadAppStateFromIDB = async (): Promise<AppState> => {
  log.debug("loadAppStateFromIDB() called");
  try {
    const db = await getIndexedDb();

    log.debug(
      "Reading from store: {}, key: {}",
      APP_STATE_STORE,
      APP_STATE_KEY
    );
    const wrapper: unknown = await db.get(APP_STATE_STORE, APP_STATE_KEY);

    if (!wrapper) {
      log.info("No saved app state found, returning defaults");
      return getDefaultAppState();
    }

    const appState = deserializeToAppState(wrapper);
    log.info("App state loaded successfully from IndexedDB");
    return appState;
  } catch (err) {
    log.warn(
      "Failed to load app state from IndexedDB, using defaults: {}",
      err
    );
    return getDefaultAppState();
  }
};
