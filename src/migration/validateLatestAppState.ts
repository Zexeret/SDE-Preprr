import {
  CURRENT_MODEL_VERSION,
  ValidationError,
  type AppState,
} from "../model";

export function validateLatestAppState(
  data: unknown
): asserts data is AppState {
  const state = data as AppState;

  if (state.version !== CURRENT_MODEL_VERSION) {
    throw new ValidationError("State is not migrated to latest version");
  }

  if (!Array.isArray(state.tasks)) {
    throw new ValidationError("Invalid tasks");
  }

  if (!Array.isArray(state.customTags)) {
    throw new ValidationError("Invalid customTags");
  }

  if (!Array.isArray(state.customGroups)) {
    throw new ValidationError("Invalid customGroups");
  }

  if (!["light", "dark"].includes(state.selectedTheme)) {
    throw new ValidationError("Invalid theme");
  }

  if (!state.exportedAt || typeof state.exportedAt != "number") {
    throw new ValidationError("Invalid exportAt");
  }
}
