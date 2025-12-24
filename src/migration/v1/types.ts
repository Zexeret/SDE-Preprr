import type { DifficultyTagId, Group, Tag, ThemeName } from "../../model";

export interface AppStateV1 {
  readonly version: 1;
  readonly tasks: ReadonlyArray<PreparationTaskV1>;
  readonly customTags: ReadonlyArray<Tag>;
  readonly customGroups: ReadonlyArray<Group>;
  readonly selectedTheme: ThemeName;
  readonly exportedAt: number;
}

export type PreparationTaskV1 = {
  readonly id: string;
  readonly groupId: string;
  readonly title: string;
  readonly link: string | null;
  readonly difficulty : DifficultyTagId ;
  readonly tags: ReadonlyArray<string>;
  readonly notes: string;
  readonly isDone: boolean;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly order: number;
};