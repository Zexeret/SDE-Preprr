import type { Group } from "./Group";
import type {  PreparationTask } from "./PreparationTask";
import type { Tag } from "./Tag";
import type { ThemeName } from "./ThemeName";

export interface AppState {
    readonly version: number;
    readonly tasks: ReadonlyArray<PreparationTask>;
    readonly customTags: ReadonlyArray<Tag>;
    readonly customGroups: ReadonlyArray<Group>;
    readonly selectedTheme: ThemeName;
    readonly exportedAt: number;
  }