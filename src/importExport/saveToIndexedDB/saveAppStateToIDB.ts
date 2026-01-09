import { CURRENT_MODEL_VERSION, type AppState } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { serializeAppState } from "../serialization";
import { APP_STATE_KEY, APP_STATE_STORE } from "../types";
import { getLogger } from "../../logger";

const log = getLogger("idb:save-app-state");

export const saveAppStateToIDB = async (state: AppState): Promise<void> => {
  log.debug("saveAppStateToIDB() called");
  try {
    const db = await getIndexedDb();

    const { wrapper } = serializeAppState(state, { compress: true });

    log.debug("Writing to IndexedDB store: {}", APP_STATE_STORE);
    await db.put(APP_STATE_STORE, wrapper, APP_STATE_KEY);
    log.info(
      "App state saved to IndexedDB (version: {})",
      CURRENT_MODEL_VERSION
    );
  } catch (error) {
    log.error("Failed to save app state to IndexedDB: {}", error);
  }
};
