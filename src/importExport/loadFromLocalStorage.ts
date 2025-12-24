import { migrate } from "../migration";
import { getDefaultAppState, type AppState } from "../model";
import {
  APP_STATE_STORAGE_KEY,
  decompressWithPako,
  generateChecksum,
} from "./helper";
import { validateExportWrapper } from "./validateExportWrapper";

export const loadFromLocalStorage = (): AppState => {
  try {
    const raw = localStorage.getItem(APP_STATE_STORAGE_KEY);
    if (!raw) return getDefaultAppState();

    const wrapper: unknown = JSON.parse(raw);

    validateExportWrapper(wrapper);

    const jsonString = wrapper.compressed
      ? decompressWithPako(wrapper.data)
      : JSON.stringify(wrapper.data);

    if (generateChecksum(jsonString) !== wrapper.checksum) {
      throw new Error("Checksum mismatch");
    }

    const rawState = JSON.parse(jsonString);
    const migrated = migrate(rawState);

    return migrated;
  } catch (err) {
    console.warn("Failed to load app state, using defaults", err);
    return getDefaultAppState();
  }
};
