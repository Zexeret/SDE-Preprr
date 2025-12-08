import type { Tag } from "./types";

export const PREDEFINED_TAGS: Tag[] = [
  // Difficulty Tags
  { id: "easy", name: "Easy", isCustom: false },
  { id: "medium", name: "Medium", isCustom: false },
  { id: "hard", name: "Hard", isCustom: false },

  // Topic Tags
  { id: "array", name: "Array", isCustom: false },
  { id: "string", name: "String", isCustom: false },
  { id: "linked-list", name: "Linked List", isCustom: false },
  { id: "tree", name: "Tree", isCustom: false },
  { id: "graph", name: "Graph", isCustom: false },
  { id: "stack", name: "Stack", isCustom: false },
  { id: "queue", name: "Queue", isCustom: false },
  { id: "heap", name: "Heap", isCustom: false },
  { id: "hash-table", name: "Hash Table", isCustom: false },
  { id: "binary-search", name: "Binary Search", isCustom: false },
  { id: "two-pointers", name: "Two Pointers", isCustom: false },
  { id: "sliding-window", name: "Sliding Window", isCustom: false },
  { id: "dp", name: "Dynamic Programming", isCustom: false },
  { id: "greedy", name: "Greedy", isCustom: false },
  { id: "backtracking", name: "Backtracking", isCustom: false },
  { id: "dfs", name: "DFS", isCustom: false },
  { id: "bfs", name: "BFS", isCustom: false },
  { id: "sorting", name: "Sorting", isCustom: false },
  { id: "math", name: "Math", isCustom: false },
  { id: "bit-manipulation", name: "Bit Manipulation", isCustom: false },
];

export const STORAGE_KEYS = {
  PROBLEMS: "dsa-manager-problems",
  CUSTOM_TAGS: "dsa-manager-custom-tags",
};

export const APP_VERSION = "1.0.0";
