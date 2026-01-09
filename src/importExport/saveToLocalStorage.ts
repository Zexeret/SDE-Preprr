import { CURRENT_MODEL_VERSION, type AppState } from "../model";
import {
  APP_STATE_STORAGE_KEY,
  compressWithPako,
  generateChecksum,
} from "./helper";
import type { ExportWrapper } from "./types";
import { getLogger } from "../logger";

const log = getLogger("storage:local-save");

/**
 * @deprecated
 * The app uses indexedDb to store contents, keeping it here just in-case someone
 * wants to understand how do we store in localStorage.
 *
 * NOTE: The logic may be out-dated compared to latest.
 */
export const saveToLocalStorage = (state: AppState) => {
  log.debug("saveToLocalStorage() called (deprecated)");
  try {
    const jsonString = JSON.stringify(state);
    const checksum = generateChecksum(jsonString);

    const wrapper: ExportWrapper = {
      compressed: true,
      checksum,
      version: CURRENT_MODEL_VERSION,
      data: compressWithPako(jsonString),
    };

    localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(wrapper));
    log.info("App state saved to localStorage");
  } catch (error) {
    log.error("Failed to save app state to localStorage: {}", error);
  }
};
