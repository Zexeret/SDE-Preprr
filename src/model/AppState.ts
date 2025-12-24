import type { Group } from "./Group";
import type { PreparationTask } from "./PreparationTask";
import type { Tag } from "./Tag";
import type { ThemeName } from "./ThemeName";

export interface AppState {
  readonly version: typeof CURRENT_MODEL_VERSION;
  readonly tasks: ReadonlyArray<PreparationTask>;
  readonly customTags: ReadonlyArray<Tag>;
  readonly customGroups: ReadonlyArray<Group>;
  readonly selectedTheme: ThemeName;
  readonly exportedAt: number;
}

export const CURRENT_MODEL_VERSION = 2 as const;

export const getDefaultAppState = (): AppState => ({
  version: CURRENT_MODEL_VERSION,
  tasks: [],
  customTags: [],
  customGroups: [],
  selectedTheme: "light",
  exportedAt: Date.now(),
});