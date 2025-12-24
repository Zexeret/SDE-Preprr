import Pako from "pako";

// Generate a simple checksum for data integrity
export const generateChecksum = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};

export const compressWithPako = (data: string): ReadonlyArray<number> =>
  Array.from(Pako.gzip(data));

export const decompressWithPako = (data: ReadonlyArray<number>): string =>
  Pako.ungzip(new Uint8Array(data), { to: "string" });

export const APP_STATE_STORAGE_KEY = "sde-preprr-app-state";
