import { CURRENT_MODEL_VERSION, type AppState } from "../model";
import { serializeAppState } from "./serialization";
import type { ExportOptions } from "./types";
import { getLogger } from "../logger";
import { EXPORT_FILE_PREFIX, EXPORT_FILE_EXTENSION } from "../constants";

const log = getLogger("export:data");

/**
 * Trigger a file download in the browser
 */
const triggerDownload = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export app state to a downloadable file
 * Accepts AppState directly for cleaner API
 */
export const exportAppState = (
  appState: AppState,
  options: ExportOptions = {}
): void => {
  const { compress = true, onProgress } = options;

  log.info(
    "Starting export - tasks: {}, tags: {}, groups: {}, compress: {}",
    appState.tasks.length,
    appState.customTags.length,
    appState.customGroups.length,
    compress
  );

  try {
    onProgress?.(10);

    // Use serialization service
    const { blob, sizeBytes } = serializeAppState(appState, { compress });

    onProgress?.(80);

    // Generate filename
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `${EXPORT_FILE_PREFIX}-${dateStr}${EXPORT_FILE_EXTENSION}`;

    log.debug("Triggering download: {}", filename);
    triggerDownload(blob, filename);

    onProgress?.(100);

    log.info(
      "Export complete - file: {}, size: {} KB",
      filename,
      (sizeBytes / 1024).toFixed(2)
    );
  } catch (error) {
    log.error("Export failed: {}", error);
    throw new Error(
      `Failed to export data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * @deprecated Use exportAppState instead
 * Legacy function for backward compatibility
 */
export const exportData = (
  tasks: AppState["tasks"],
  customTags: AppState["customTags"],
  customGroups: AppState["customGroups"],
  selectedTheme: AppState["selectedTheme"],
  options: ExportOptions = {}
): void => {
  const appState: AppState = {
    version: CURRENT_MODEL_VERSION,
    tasks,
    customTags,
    customGroups,
    selectedTheme,
    exportedAt: Date.now(),
  };

  exportAppState(appState, options);
};
