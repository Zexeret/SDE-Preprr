import type { DifficultyTagId } from "./Difficulty";

export type PreparationTask = {
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

export type SortBy = "dateAdded" | "dateUpdated" | "status" | "name";
export type SortOrder = "asc" | "desc";

export const CURRENT_MODEL_VERSION = 1;
