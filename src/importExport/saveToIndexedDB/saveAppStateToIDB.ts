import { CURRENT_MODEL_VERSION, type AppState } from "../../model";
import { getIndexedDb } from "../getIndexedDb";
import { compressWithPako, generateChecksum } from "../helper";
import { APP_STATE_KEY, APP_STATE_STORE, type ExportWrapper } from "../types";

export const saveAppStateToIDB = async (state: AppState): Promise<void> => {
  try {
    const db = await getIndexedDb();

    const jsonString = JSON.stringify(state);
    const checksum = generateChecksum(jsonString);

    const wrapper: ExportWrapper = {
      compressed: true,
      version: CURRENT_MODEL_VERSION,
      checksum,
      data: compressWithPako(jsonString),
    };

    await db.put(APP_STATE_STORE, wrapper, APP_STATE_KEY);
    console.log("App state saved to IndexedDB");
  } catch (error) {
    console.error("Failed to save app state to IndexedDB:", error);
  }
};
