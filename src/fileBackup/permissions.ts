import { getLogger } from "../logger";

const log = getLogger("file:permissions");

/**
 * Check if File System Access API is supported
 */
export const isFileSystemAccessSupported = (): boolean => {
  return "showOpenFilePicker" in window && "showSaveFilePicker" in window;
};

/**
 * Request permission for a file handle
 */
export const requestFilePermission = async (
  handle: FileSystemFileHandle,
  mode: "read" | "readwrite" = "readwrite"
): Promise<boolean> => {
  log.debug(
    "requestFilePermission() called - mode: {}, file: {}",
    mode,
    handle.name
  );
  try {
    const permission = await handle.queryPermission({ mode });
    log.debug("Current permission status: {}", permission);
    if (permission === "granted") {
      return true;
    }

    log.debug("Requesting permission from user...");
    const requestResult = await handle.requestPermission({ mode });
    log.debug("Permission request result: {}", requestResult);
    return requestResult === "granted";
  } catch (error) {
    log.error("Failed to request file permission: {}", error);
    return false;
  }
};

/**
 * Check if handle has permission without prompting
 */
export const hasPermission = async (
  handle: FileSystemFileHandle,
  mode: "read" | "readwrite" = "readwrite"
): Promise<boolean> => {
  try {
    const permission = await handle.queryPermission({ mode });
    return permission === "granted";
  } catch {
    return false;
  }
};
