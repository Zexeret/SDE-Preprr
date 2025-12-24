import type { Tag } from "./Tag";

export enum DifficultyTagId {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

// Common difficulty tags for all groups
export const DIFFICULTY_TAGS: ReadonlyArray<Tag<DifficultyTagId>> = [
  {
    id: DifficultyTagId.EASY,
    name: "Easy",
    isCustom: false,
    groupId: null,
  },
  {
    id: DifficultyTagId.MEDIUM,
    name: "Medium",
    isCustom: false,
    groupId: null,
  },
  {
    id: DifficultyTagId.HARD,
    name: "Hard",
    isCustom: false,
    groupId: null,
  },
];
