import {
  CURRENT_MODEL_VERSION,
  type AppState,
  type Group,
  type PreparationTask,
  type Tag,
} from "../model";
import { compressWithPako, generateChecksum } from "./helper";
import type { ExportOptions } from "./types";

export const exportData = (
  tasks: ReadonlyArray<PreparationTask>,
  customTags: ReadonlyArray<Tag>,
  customGroups: ReadonlyArray<Group>,
  selectedTheme: "light" | "dark",
  options: ExportOptions = {}
): void => {
  const { compress = true, onProgress } = options;

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

    const jsonString = JSON.stringify(data);
    const checksum = generateChecksum(jsonString);

    onProgress?.(50);

    let fileContent: Blob;
    let filename: string;
    const dateStr = new Date().toISOString().split("T")[0];

    if (compress) {
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

    const url = URL.createObjectURL(fileContent);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onProgress?.(100);

    console.log(
      `Export complete. File size: ${(fileContent.size / 1024).toFixed(4)} KB`
    );
  } catch (error) {
    console.error("Export failed:", error);
    throw new Error(
      `Failed to export data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
