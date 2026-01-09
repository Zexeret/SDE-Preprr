import { getLogger } from "../logger";
import { BACKUP_FILE_PREFIX, EXPORT_FILE_EXTENSION } from "../constants";

const log = getLogger("file:picker");

/**
 * Open file picker to select an existing file
 */
export const openFilePicker =
  async (): Promise<FileSystemFileHandle | null> => {
    log.debug("openFilePicker() called");
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
        multiple: false,
      });
      log.info("File selected: {}", handle.name);
      return handle;
    } catch (error) {
      // User cancelled the picker
      if (error instanceof Error && error.name === "AbortError") {
        log.debug("File picker cancelled by user");
        return null;
      }
      log.error("Failed to open file picker: {}", error);
      throw error;
    }
  };

/**
 * Open save file picker to create a new file
 */
export const createFilePicker =
  async (): Promise<FileSystemFileHandle | null> => {
    log.debug("createFilePicker() called");
    try {
      const dateStr = new Date().toISOString().split("T")[0];
      const handle = await window.showSaveFilePicker({
        suggestedName: `${BACKUP_FILE_PREFIX}-${dateStr}${EXPORT_FILE_EXTENSION}`,
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
      });
      log.info("File created: {}", handle.name);
      return handle;
    } catch (error) {
      // User cancelled the picker
      if (error instanceof Error && error.name === "AbortError") {
        log.debug("Save file picker cancelled by user");
        return null;
      }
      log.error("Failed to create file picker: {}", error);
      throw error;
    }
  };
