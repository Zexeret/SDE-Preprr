export type Tag = {
  readonly id: string;
  readonly name: string;
  readonly isCustom: boolean;
}

export interface Problem {
  readonly id: string;
  readonly link: string;
  readonly tags: ReadonlyArray<Tag>;
  readonly notes: string;
  readonly isDone: boolean;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly order: number;
}

export type SortBy = "dateAdded" | "dateUpdated" | "status" | "name";
export type SortOrder = "asc" | "desc";

export interface ExportData {
  readonly version: string;
  readonly problems: ReadonlyArray<Problem>;
  readonly customTags: ReadonlyArray<Tag>;
  readonly exportedAt: number;
}
