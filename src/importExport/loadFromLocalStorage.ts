import { migrate } from "../migration";
import { getDefaultAppState, type AppState } from "../model";
import {
  APP_STATE_STORAGE_KEY,
  decompressWithPako,
  generateChecksum,
} from "./helper";
import { validateExportWrapper } from "./validateExportWrapper";
import { getLogger } from "../logger";

const log = getLogger("storage:local-load");

/**
 * @deprecated
 * The app uses indexedDb to store contents, keeping it here just in-case someone
 * wants to understand how do we store in localStorage.
 *
 * NOTE: The logic may be out-dated compared to latest.
 *
 */
export const loadFromLocalStorage = (): AppState => {
  log.debug("loadFromLocalStorage() called (deprecated)");
  try {
    const raw = localStorage.getItem(APP_STATE_STORAGE_KEY);
    if (!raw) {
      log.debug("No data found in localStorage, returning defaults");
      return getDefaultAppState();
    }

    log.debug("Parsing localStorage data...");
    const wrapper: unknown = JSON.parse(raw);

    validateExportWrapper(wrapper);

    const jsonString = wrapper.compressed
      ? decompressWithPako(wrapper.data)
      : JSON.stringify(wrapper.data);

    if (generateChecksum(jsonString) !== wrapper.checksum) {
      log.error("Checksum mismatch in localStorage data");
      throw new Error("Checksum mismatch");
    }

    const rawState = JSON.parse(jsonString);
    const migrated = migrate(rawState);

    log.info("App state loaded from localStorage");
    return migrated;
  } catch (err) {
    log.warn(
      "Failed to load app state from localStorage, using defaults: {}",
      err
    );
    return getDefaultAppState();
  }
};
