import type { Tag } from "./Tag";

export type Group = {
  readonly id: string;
  readonly name: string;
  readonly isCustom: boolean;
  readonly createdAt: number;
};

export type PreparationTask = {
  readonly id: string;
  readonly groupId: string;
  readonly link: string;
  readonly tags: ReadonlyArray<Tag>;
  readonly notes: string;
  readonly isDone: boolean;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly order: number;
};

export type SortBy = "dateAdded" | "dateUpdated" | "status" | "name";
export type SortOrder = "asc" | "desc";

export interface ExportData {
  readonly version: string;
  readonly tasks: ReadonlyArray<PreparationTask>;
  readonly problems?: ReadonlyArray<PreparationTask>;
  readonly customTags: ReadonlyArray<Tag>;
  readonly customGroups: ReadonlyArray<Group>;
  readonly exportedAt: number;
}
