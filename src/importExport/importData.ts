import { migrate } from "../migration";
import { ImportError, type AppState } from "../model";
import { decompressWithPako, generateChecksum } from "./helper";
import type { ExportWrapper, ImportOptions } from "./types";

export const importData = (
  file: File,
  options: ImportOptions = {}
): Promise<AppState> => {
  const { onProgress, validateOnly = false } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        onProgress?.(10);

        const wrapper = JSON.parse(reader.result as string) as ExportWrapper;

        onProgress?.(30);

        const jsonString = wrapper.compressed
          ? decompressWithPako(wrapper.data)
          : JSON.stringify(wrapper.data);

        onProgress?.(50);

        const checksum = generateChecksum(jsonString);
        if (checksum !== wrapper.checksum) {
          throw new ImportError("Checksum mismatch");
        }

        onProgress?.(70);

        const rawData = JSON.parse(jsonString);
        const migrated = migrate(rawData);

        onProgress?.(90);

        if (validateOnly) {
          resolve(migrated);
          return;
        }

        onProgress?.(100);
        resolve(migrated);
      } catch (err) {
        reject(err instanceof Error ? err : new ImportError("Unknown import error"));
      }
    };

    reader.onerror = () => reject(new ImportError("File read failed"));
    reader.readAsText(file);
  });
};