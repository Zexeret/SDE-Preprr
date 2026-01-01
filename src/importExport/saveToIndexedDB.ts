import { CURRENT_MODEL_VERSION, type AppState } from "../model";
import { getIndexedDb, STORE_NAME } from "./getIndexedDb";
import { compressWithPako, generateChecksum } from "./helper";
import type { ExportWrapper } from "./types";

export const saveToIndexedDB = async (state: AppState): Promise<void> => {
  try {
    const db = await getIndexedDb();

    const jsonString = JSON.stringify(state);
    const checksum = generateChecksum(jsonString);

    const wrapper : ExportWrapper = {
      compressed: true,
      version: CURRENT_MODEL_VERSION,
      checksum,
      data: compressWithPako(jsonString),
    };

    await db.put(STORE_NAME, wrapper, "current");
    console.log("App state saved to IndexedDB");
  } catch (error) {
    console.error("Failed to save app state to IndexedDB:", error);
  }
};