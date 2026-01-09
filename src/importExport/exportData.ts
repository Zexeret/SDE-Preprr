import {
  CURRENT_MODEL_VERSION,
  type AppState,
  type Group,
  type PreparationTask,
  type Tag,
} from "../model";
import { compressWithPako, generateChecksum } from "./helper";
import type { ExportOptions } from "./types";
import { getLogger } from "../logger";

const log = getLogger("export:data");

export const exportData = (
  tasks: ReadonlyArray<PreparationTask>,
  customTags: ReadonlyArray<Tag>,
  customGroups: ReadonlyArray<Group>,
  selectedTheme: "light" | "dark",
  options: ExportOptions = {}
): void => {
  const { compress = true, onProgress } = options;

  log.info(
    "Starting export - tasks: {}, tags: {}, groups: {}, compress: {}",
    tasks.length,
    customTags.length,
    customGroups.length,
    compress
  );

  try {
    onProgress?.(10);

    const data: AppState = {
      version: CURRENT_MODEL_VERSION,
      tasks,
      customTags,
      customGroups,
      selectedTheme,
      exportedAt: Date.now(),
    };

    onProgress?.(30);

    log.debug("Serializing app state...");
    const jsonString = JSON.stringify(data);
    const checksum = generateChecksum(jsonString);
    log.debug("Checksum generated: {}", checksum.substring(0, 8) + "...");

    onProgress?.(50);

    let fileContent: Blob;
    let filename: string;
    const dateStr = new Date().toISOString().split("T")[0];

    if (compress) {
      log.debug("Compressing data with pako...");
      // Compress using pako (gzip)
      const compressedData = compressWithPako(jsonString);

      // Create a wrapper with metadata
      const wrapper = {
        compressed: true,
        checksum,
        version: CURRENT_MODEL_VERSION,
        data: compressedData, // Convert Uint8Array to regular array for JSON
      };

      fileContent = new Blob([JSON.stringify(wrapper)], {
        type: "application/json",
      });
      filename = `sde-preper-save-${dateStr}.json`;
    } else {
      log.debug("Creating uncompressed export...");
      // Uncompressed with checksum
      const wrapper = {
        compressed: false,
        checksum,
        version: CURRENT_MODEL_VERSION,
        data: JSON.parse(jsonString),
      };

      fileContent = new Blob([JSON.stringify(wrapper, null, 2)], {
        type: "application/json",
      });
      filename = `sde-preper-save-${dateStr}.json`;
    }

    onProgress?.(80);

    log.debug("Triggering download: {}", filename);
    const url = URL.createObjectURL(fileContent);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onProgress?.(100);

    log.info(
      "Export complete - file: {}, size: {} KB",
      filename,
      (fileContent.size / 1024).toFixed(2)
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
