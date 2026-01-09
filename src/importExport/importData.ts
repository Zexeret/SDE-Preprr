import { ImportError, type AppState } from "../model";
import { deserializeFromFile } from "./serialization";
import type { ImportOptions } from "./types";
import { getLogger } from "../logger";

const log = getLogger("import:data");

export const importData = async (
  file: File,
  options: ImportOptions = {}
): Promise<AppState> => {
  const { onProgress } = options;

  log.info("Starting import from file: {}", file.name);

  onProgress?.(10);

  try {
    const appState = await deserializeFromFile(file);
    onProgress?.(100);
    log.info(
      "Import successful - tasks: {}, tags: {}, groups: {}",
      appState.tasks.length,
      appState.customTags.length,
      appState.customGroups.length
    );
    return appState;
  } catch (err) {
    log.error("Import failed: {}", err);
    throw err instanceof Error ? err : new ImportError("Unknown import error");
  }
};
