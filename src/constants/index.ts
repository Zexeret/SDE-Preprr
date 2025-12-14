import type { Tag, Group } from "../model";

export const PREDEFINED_GROUPS: ReadonlyArray<Group> = [
  { id: "dsa", name: "DSA Problems", isCustom: false, createdAt: Date.now() },
  {
    id: "system-design",
    name: "System Design",
    isCustom: false,
    createdAt: Date.now(),
  },
  { id: "backend", name: "Backend", isCustom: false, createdAt: Date.now() },
  { id: "frontend", name: "Frontend", isCustom: false, createdAt: Date.now() },
] as const;

export const DEFAULT_GROUP_ID = "dsa" as const;

// Common difficulty tags for all groups
export const DIFFICULTY_TAGS: ReadonlyArray<Tag> = [
  { id: "easy", name: "Easy", isCustom: false },
  { id: "medium", name: "Medium", isCustom: false },
  { id: "hard", name: "Hard", isCustom: false },
] as const;

// DSA-specific tags (only for DSA group)
export const DSA_SPECIFIC_TAGS: ReadonlyArray<Tag> = [
  { id: "array", name: "Array", isCustom: false, groupId: "dsa" },
  { id: "string", name: "String", isCustom: false, groupId: "dsa" },
  { id: "linked-list", name: "Linked List", isCustom: false, groupId: "dsa" },
  { id: "tree", name: "Tree", isCustom: false, groupId: "dsa" },
  { id: "graph", name: "Graph", isCustom: false, groupId: "dsa" },
  { id: "stack", name: "Stack", isCustom: false, groupId: "dsa" },
  { id: "queue", name: "Queue", isCustom: false, groupId: "dsa" },
  { id: "heap", name: "Heap", isCustom: false, groupId: "dsa" },
  { id: "hash-table", name: "Hash Table", isCustom: false, groupId: "dsa" },
  {
    id: "binary-search",
    name: "Binary Search",
    isCustom: false,
    groupId: "dsa",
  },
  { id: "two-pointers", name: "Two Pointers", isCustom: false, groupId: "dsa" },
  {
    id: "sliding-window",
    name: "Sliding Window",
    isCustom: false,
    groupId: "dsa",
  },
  { id: "dp", name: "Dynamic Programming", isCustom: false, groupId: "dsa" },
  { id: "greedy", name: "Greedy", isCustom: false, groupId: "dsa" },
  { id: "backtracking", name: "Backtracking", isCustom: false, groupId: "dsa" },
  { id: "dfs", name: "DFS", isCustom: false, groupId: "dsa" },
  { id: "bfs", name: "BFS", isCustom: false, groupId: "dsa" },
  { id: "sorting", name: "Sorting", isCustom: false, groupId: "dsa" },
  { id: "math", name: "Math", isCustom: false, groupId: "dsa" },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    isCustom: false,
    groupId: "dsa",
  },
] as const;

export const APP_VERSION = "1.0.0" as const;

export const DIFFICULTY_TAG_IDS = ["easy", "medium", "hard"] as const;
