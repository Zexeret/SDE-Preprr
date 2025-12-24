import type { ExportWrapper } from "./types";

export function validateExportWrapper(
  value: unknown
): asserts value is ExportWrapper {
  if (typeof value !== "object" || value === null) {
    throw new Error("Wrapper is not an object");
  }

  const wrapper = value as Record<string, unknown>;

  // compressed
  if (typeof wrapper.compressed !== "boolean") {
    throw new Error("Wrapper.compressed must be boolean");
  }

  // version
  if (typeof wrapper.version !== "number") {
    throw new Error("Wrapper.version must be a number");
  }

  // checksum
  if (typeof wrapper.checksum !== "string") {
    throw new Error("Wrapper.checksum must be a string");
  }

  // branch on discriminated union
  if (wrapper.compressed === true) {
    if (
      !Array.isArray(wrapper.data) ||
      !wrapper.data.every((n) => typeof n === "number")
    ) {
      throw new Error(
        "Compressed wrapper.data must be an array of numbers"
      );
    }
  } else {
    // compressed === false
    // data can be ANY unknown, but must exist
    if (!("data" in wrapper)) {
      throw new Error("Uncompressed wrapper missing data field");
    }
  }
}
