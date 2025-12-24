import { ValidationError } from "../model";

export function validateRawAppState(
  data: unknown
): asserts data is { readonly version: number } {
  if (!data || typeof data !== "object") {
    throw new ValidationError("Data is not an object");
  }

  if (!("version" in data) || typeof (data as any).version !== "number") {
    throw new ValidationError("Missing or invalid version");
  }
}
