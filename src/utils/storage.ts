import pako from "pako";
import type {
  AppState,
} from "../model";
import { CURRENT_MODEL_VERSION } from "../model";

const APP_STATE_STORAGE_KEY = "sde-preprr-app-state";

// Storage wrapper with compression
interface StorageWrapper {
  readonly compressed: boolean;
  readonly checksum: string;
  readonly version: string;
  readonly data: ReadonlyArray<number> // compressed data as array
}

// Generate checksum for integrity
const generateChecksum = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
};

const getDefaultState = (): AppState => ({
  version: CURRENT_MODEL_VERSION,
  tasks: [],
  customTags: [],
  customGroups: [],
  selectedTheme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  exportedAt: Date.now(),
});

// Load entire app state from localStorage
export const loadAppState = (): AppState => {
  try {
    const stored = localStorage.getItem(APP_STATE_STORAGE_KEY);
    if (!stored) return getDefaultState();

    const wrapper: StorageWrapper = JSON.parse(stored);

    // Decompress the data
    const compressedArray = new Uint8Array(wrapper.data);
    const decompressed = pako.ungzip(compressedArray, { to: "string" });

    // Verify checksum
    const calculatedChecksum = generateChecksum(decompressed);
    if (wrapper.checksum !== calculatedChecksum) {
      console.warn("Data integrity check failed. Loading default state.");
      return getDefaultState();
    }

    const state: AppState = JSON.parse(decompressed);
    return state;
  } catch (error) {
    console.error("Failed to load app state:", error);
    return getDefaultState();
  }
};

// Save entire app state to localStorage
export const saveAppState = (state: AppState): void => {
  try {
    // console.log("Saving app with state: ", state);
    const jsonString = JSON.stringify(state);
    const checksum = generateChecksum(jsonString);

    // Compress the data
    const compressed = pako.gzip(jsonString);

    const wrapper: StorageWrapper = {
      compressed: true,
      checksum,
      version: CURRENT_MODEL_VERSION.toString(),
      data: Array.from(compressed),
    };

    localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(wrapper));

    // Log compression stats
    // const originalSize = new Blob([jsonString]).size;
    // const compressedSize = new Blob([JSON.stringify(wrapper)]).size;
    // const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    // console.log(
    //   `Saved app state: ${(originalSize / 1024).toFixed(2)} KB → ${(
    //     compressedSize / 1024
    //   ).toFixed(2)} KB (${ratio}% reduction)`
    // );
  } catch (error) {
    console.error("Failed to save app state:", error);
    // If localStorage is full, try to clear and save again
    if (error instanceof Error && error.name === "QuotaExceededError") {
      console.warn(
        "Storage quota exceeded. Consider exporting data to a file."
      );
    }
  }
};

// Clear all app data
export const clearAppState = (): void => {
  try {
    localStorage.removeItem(APP_STATE_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear app state:", error);
  }
};

// Get storage size estimate
export const getStorageSize = (): { readonly used: number; readonly estimated: number } => {
  try {
    const stored = localStorage.getItem(APP_STATE_STORAGE_KEY);
    if (!stored) return { used: 0, estimated: 0 };

    const used = new Blob([stored]).size;
    const wrapper: StorageWrapper = JSON.parse(stored);
    const compressedArray = new Uint8Array(wrapper.data);
    const decompressed = pako.ungzip(compressedArray, { to: "string" });
    const estimated = new Blob([decompressed]).size;

    return { used, estimated };
  } catch {
    return { used: 0, estimated: 0 };
  }
};
