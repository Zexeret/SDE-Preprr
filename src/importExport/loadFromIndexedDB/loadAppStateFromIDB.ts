import { migrate } from "../../migration";
import { getDefaultAppState, type AppState } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { decompressWithPako, generateChecksum } from "../helper";
import { APP_STATE_KEY, APP_STATE_STORE } from "../types";
import { validateExportWrapper } from "../validateExportWrapper";

export const loadAppStateFromIDB = async (): Promise<AppState> => {
  try {
    const db = await getIndexedDb();

    const wrapper: unknown = await db.get(APP_STATE_STORE, APP_STATE_KEY);

    if (!wrapper) {
      return getDefaultAppState();
    }

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
    console.warn(
      "Failed to load app state from IndexedDB, using defaults",
      err
    );
    return getDefaultAppState();
  }
};
