import { migrate } from "../../migration";
import { getDefaultAppState, type AppState } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { decompressWithPako, generateChecksum } from "../helper";
import { APP_STATE_KEY, APP_STATE_STORE } from "../types";
import { validateExportWrapper } from "../validateExportWrapper";
import { getLogger } from "../../logger";

const log = getLogger("idb:load-app-state");

export const loadAppStateFromIDB = async (): Promise<AppState> => {
  log.debug("loadAppStateFromIDB() called");
  try {
    log.debug("Getting IndexedDB instance...");
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

    log.debug("Validating export wrapper...");
    validateExportWrapper(wrapper);

    log.debug("Decompressing data (compressed: {})", wrapper.compressed);
    const jsonString = wrapper.compressed
      ? decompressWithPako(wrapper.data)
      : JSON.stringify(wrapper.data);

    log.debug("Verifying checksum...");
    if (generateChecksum(jsonString) !== wrapper.checksum) {
      log.error("Checksum mismatch - data may be corrupted");
      throw new Error("Checksum mismatch");
    }

    log.debug(
      "Parsing JSON and migrating state (version: {})",
      wrapper.version
    );
    const rawState = JSON.parse(jsonString);
    const migrated = migrate(rawState);

    log.info("App state loaded successfully from IndexedDB");
    return migrated;
  } catch (err) {
    log.warn(
      "Failed to load app state from IndexedDB, using defaults: {}",
      err
    );
    return getDefaultAppState();
  }
};
