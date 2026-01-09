import { migrate } from "../../migration";
import { ImportError, type AppState } from "../../model";
import { decompressWithPako, generateChecksum } from "../helper";
import { validateExportWrapper } from "../validateExportWrapper";
import { getLogger } from "../../logger";

const log = getLogger("serialization:deserialize");

export interface DeserializeOptions {
  readonly validateOnly?: boolean;
  readonly skipMigration?: boolean;
}

/**
 * Deserialize ExportWrapper to AppState
 * Single source of truth for all deserialization operations
 */
export const deserializeToAppState = (
  wrapper: unknown,
  options: DeserializeOptions = {}
): AppState => {
  const { skipMigration = false } = options;

  log.debug("Deserializing wrapper...");

  // Validate wrapper structure
  validateExportWrapper(wrapper);

  log.debug(
    "Wrapper validated - version: {}, compressed: {}",
    wrapper.version,
    wrapper.compressed
  );

  // Decompress if needed
  const jsonString = wrapper.compressed
    ? decompressWithPako(wrapper.data)
    : JSON.stringify(wrapper.data);

  log.debug("Data decompressed, verifying checksum...");

  // Verify checksum
  const checksum = generateChecksum(jsonString);
  if (checksum !== wrapper.checksum) {
    log.error(
      "Checksum mismatch - expected: {}, got: {}",
      wrapper.checksum,
      checksum
    );
    throw new ImportError("Checksum mismatch - data may be corrupted");
  }

  log.debug("Checksum verified, parsing JSON...");

  // Parse raw data
  const rawData = JSON.parse(jsonString);

  // Migrate to latest version
  if (skipMigration) {
    log.debug("Skipping migration as requested");
    return rawData as AppState;
  }

  log.debug("Running migrations...");
  const migrated = migrate(rawData);

  log.info("Deserialization complete - version: {}", migrated.version);

  return migrated;
};

/**
 * Parse JSON string to ExportWrapper
 */
export const parseToWrapper = (jsonString: string): unknown => {
  try {
    return JSON.parse(jsonString);
  } catch {
    throw new ImportError("Invalid JSON format");
  }
};

/**
 * Deserialize from JSON string directly
 */
export const deserializeFromJson = (
  jsonString: string,
  options: DeserializeOptions = {}
): AppState => {
  const wrapper = parseToWrapper(jsonString);
  return deserializeToAppState(wrapper, options);
};

/**
 * Deserialize from File object
 */
export const deserializeFromFile = (
  file: File,
  options: DeserializeOptions = {}
): Promise<AppState> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const result = deserializeFromJson(reader.result as string, options);
        resolve(result);
      } catch (error) {
        reject(
          error instanceof Error
            ? error
            : new ImportError("Failed to deserialize file")
        );
      }
    };

    reader.onerror = () => reject(new ImportError("Failed to read file"));
    reader.readAsText(file);
  });
};
