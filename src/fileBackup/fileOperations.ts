import { type AppState } from "../model";
import {
  serializeAppState,
  wrapperToJson,
} from "../importExport/serialization";
import { requestFilePermission } from "./permissions";
import { getLogger } from "../logger";

const log = getLogger("file:operations");

/**
 * Save app state to file
 */
export const saveToFile = async (
  handle: FileSystemFileHandle,
  state: AppState
): Promise<number> => {
  log.debug("saveToFile() called for: {}", handle.name);
  try {
    // Verify permission before writing
    log.debug("Verifying write permission...");
    const hasPermission = await requestFilePermission(handle);
    if (!hasPermission) {
      log.error("Permission denied to write to file");
      throw new Error("Permission denied to write to file");
    }

    log.debug("Serializing state...");
    const { wrapper } = serializeAppState(state, { compress: true });

    log.debug("Writing to file...");
    const writable = await handle.createWritable();
    await writable.write(wrapperToJson(wrapper));
    await writable.close();

    const savedAt = Date.now();
    log.info("App state saved to file: {}", handle.name);

    return savedAt;
  } catch (error) {
    log.error("Failed to save to file: {}", error);
    throw error;
  }
};

/**
 * Read file from a file handle
 */
export const readFromFileHandle = async (
  handle: FileSystemFileHandle
): Promise<File> => {
  log.debug("readFromFileHandle() called for: {}", handle.name);

  // Verify permission before reading
  const hasPermission = await requestFilePermission(handle, "read");
  if (!hasPermission) {
    log.error("Permission denied to read file");
    throw new Error("Permission denied to read file");
  }

  const file = await handle.getFile();
  log.debug("File read successfully: {} ({} bytes)", file.name, file.size);
  return file;
};
