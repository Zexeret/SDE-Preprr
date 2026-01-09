import { CURRENT_MODEL_VERSION, type AppState } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { compressWithPako, generateChecksum } from "../helper";
import { APP_STATE_KEY, APP_STATE_STORE, type ExportWrapper } from "../types";
import { getLogger } from "../../logger";

const log = getLogger("idb:save-app-state");

export const saveAppStateToIDB = async (state: AppState): Promise<void> => {
  log.debug("saveAppStateToIDB() called");
  try {
    log.debug("Getting IndexedDB instance...");
    const db = await getIndexedDb();

    log.debug("Serializing app state...");
    const jsonString = JSON.stringify(state);
    const checksum = generateChecksum(jsonString);
    log.debug("Checksum generated: {}", checksum.substring(0, 8) + "...");

    const wrapper: ExportWrapper = {
      compressed: true,
      version: CURRENT_MODEL_VERSION,
      checksum,
      data: compressWithPako(jsonString),
    };

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
