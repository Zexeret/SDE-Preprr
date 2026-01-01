import { migrate } from "../migration";
import { getDefaultAppState, type AppState } from "../model";
import { getIndexedDb, STORE_NAME } from "./getIndexedDb";
import { decompressWithPako, generateChecksum } from "./helper";
import { validateExportWrapper } from "./validateExportWrapper";

export const loadFromIndexedDB = async (): Promise<AppState> => {
  try {
    const db = await getIndexedDb();

    // We currently store one key: "current"
    const wrapper: unknown = await db.get(STORE_NAME, "current");

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
