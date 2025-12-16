import pako from "pako";
import {
  type PreparationTask,
  type Tag,
  type Group,
  CURRENT_MODEL_VERSION,
  type AppState,
} from "../model";

// Generate a simple checksum for data integrity
const generateChecksum = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};

// Validate export data structure
const validateExportData = (data: any): data is AppState => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid data format");
  }

  if (!data.version || typeof data.version !== "number") {
    throw new Error("Missing or invalid version");
  }

  if (!Array.isArray(data.tasks)) {
    throw new Error("Invalid tasks array");
  }

  if (!Array.isArray(data.customTags)) {
    throw new Error("Invalid customTags array");
  }

  if (!Array.isArray(data.customGroups)) {
    throw new Error("Invalid customGroups array");
  }

  if (
    !data.selectedTheme ||
    (data.selectedTheme !== "light" && data.selectedTheme !== "dark")
  ) {
    throw new Error("Missing or invalid selectedTheme");
  }

  if (!data.exportedAt || typeof data.exportedAt !== "number") {
    throw new Error("Missing or invalid exportedAt timestamp");
  }

  return true;
};

// Estimate data size for user feedback
const estimateDataSize = (
  tasks: ReadonlyArray<PreparationTask>,
  customTags: ReadonlyArray<Tag>,
  customGroups: ReadonlyArray<Group>,
  selectedTheme: "light" | "dark"
): { readonly uncompressed: number; readonly estimated: number } => {
  const jsonStr = JSON.stringify({
    tasks,
    customTags,
    customGroups,
    selectedTheme,
  });
  const uncompressed = new Blob([jsonStr]).size;
  const estimated = Math.ceil(uncompressed * 0.3); // Compression typically achieves 70% reduction
  return { uncompressed, estimated };
};

export interface ExportOptions {
  readonly compress?: boolean;
  readonly onProgress?: (progress: number) => void;
}

export interface ImportOptions {
  readonly onProgress?: (progress: number) => void;
  readonly validateOnly?: boolean;
}

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
      const compressed = pako.gzip(jsonString);

      // Create a wrapper with metadata
      const wrapper = {
        compressed: true,
        checksum,
        version: CURRENT_MODEL_VERSION,
        data: Array.from(compressed), // Convert Uint8Array to regular array for JSON
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

export const importData = (
  file: File,
  options: ImportOptions = {}
): Promise<AppState> => {
  const { onProgress, validateOnly = false } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        onProgress?.(10);

        const fileContent = e.target?.result as string;
        if (!fileContent) {
          throw new Error("Empty file");
        }

        onProgress?.(20);

        // Parse the wrapper
        const wrapper = JSON.parse(fileContent);

        onProgress?.(30);

        let jsonString: string;

        if (wrapper.compressed) {
          // Decompress the data
          const compressedArray = new Uint8Array(wrapper.data);
          const decompressed = pako.ungzip(compressedArray, { to: "string" });
          jsonString = decompressed;
        } else {
          // Data is not compressed
          jsonString = JSON.stringify(wrapper.data);
        }

        onProgress?.(50);

        // Verify checksum
        const calculatedChecksum = generateChecksum(jsonString);
        if (wrapper.checksum && wrapper.checksum !== calculatedChecksum) {
          throw new Error(
            "Data integrity check failed. The file may be corrupted."
          );
        }

        onProgress?.(70);

        // Parse and validate the actual data
        const data = JSON.parse(jsonString) as AppState;
        validateExportData(data);

        onProgress?.(90);

        // Additional validation for task structure
        data.tasks.forEach((task, index) => {
          if (!task.id || !task.title) {
            throw new Error(`Invalid task at index ${index}`);
          }
        });

        onProgress?.(100);

        console.log(
          `Import successful. Loaded ${data.tasks.length} tasks, ${data.customTags.length} tags, ${data.customGroups.length} groups, theme: ${data.selectedTheme}`
        );

        if (validateOnly) {
          console.log("Validation complete. No data was imported.");
        }

        resolve(data);
      } catch (error) {
        console.error("Failed to parse file:", error);
        reject(
          new Error(
            `Failed to import file: ${
              error instanceof Error ? error.message : "Invalid format"
            }`
          )
        );
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

// Utility to estimate export size before exporting
export const getExportSizeEstimate = (
  tasks: ReadonlyArray<PreparationTask>,
  customTags: ReadonlyArray<Tag>,
  customGroups: ReadonlyArray<Group>,
  selectedTheme: "light" | "dark"
): string => {
  const { uncompressed, estimated } = estimateDataSize(
    tasks,
    customTags,
    customGroups,
    selectedTheme
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return `Estimated size: ${formatSize(
    estimated
  )} (compressed from ${formatSize(uncompressed)})`;
};
