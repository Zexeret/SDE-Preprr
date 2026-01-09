import { CURRENT_MODEL_VERSION, type AppState } from "../../model";
import { compressWithPako, generateChecksum } from "../helper";
import type { ExportWrapper } from "../types";
import { getLogger } from "../../logger";

const log = getLogger("serialization:serialize");

export interface SerializeOptions {
  readonly compress?: boolean;
}

export interface SerializedData {
  readonly wrapper: ExportWrapper;
  readonly blob: Blob;
  readonly checksum: string;
  readonly sizeBytes: number;
}

/**
 * Serialize AppState to ExportWrapper format
 * Single source of truth for all serialization operations
 */
export const serializeAppState = (
  state: AppState,
  options: SerializeOptions = {}
): SerializedData => {
  const { compress = true } = options;

  log.debug("Serializing app state (compress: {})", compress);

  const jsonString = JSON.stringify(state);
  const checksum = generateChecksum(jsonString);

  log.debug("Generated checksum: {}", checksum.substring(0, 8) + "...");

  let wrapper: ExportWrapper;

  if (compress) {
    log.debug("Compressing with pako...");
    wrapper = {
      compressed: true,
      version: CURRENT_MODEL_VERSION,
      checksum,
      data: compressWithPako(jsonString),
    };
  } else {
    wrapper = {
      compressed: false,
      version: CURRENT_MODEL_VERSION,
      checksum,
      data: JSON.parse(jsonString),
    };
  }

  const blob = new Blob([JSON.stringify(wrapper)], {
    type: "application/json",
  });

  log.debug("Serialization complete, size: {} bytes", blob.size);

  return {
    wrapper,
    blob,
    checksum,
    sizeBytes: blob.size,
  };
};

/**
 * Convert ExportWrapper to JSON string for storage
 */
export const wrapperToJson = (wrapper: ExportWrapper): string => {
  return JSON.stringify(wrapper);
};
