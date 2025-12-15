import type { Tag } from "../model";
import { PredefinedGroupId } from "./predefinedGroups";


export const DSA_SPECIFIC_TAGS: ReadonlyArray<Tag> = [
    { id: "array", name: "Array", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "string", name: "String", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "linked-list", name: "Linked List", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "tree", name: "Tree", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "graph", name: "Graph", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "stack", name: "Stack", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "queue", name: "Queue", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "heap", name: "Heap", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "hash-table", name: "Hash Table", isCustom: false, groupId: PredefinedGroupId.DSA },
    {
      id: "binary-search",
      name: "Binary Search",
      isCustom: false,
      groupId: PredefinedGroupId.DSA,
    },
    { id: "two-pointers", name: "Two Pointers", isCustom: false, groupId: PredefinedGroupId.DSA },
    {
      id: "sliding-window",
      name: "Sliding Window",
      isCustom: false,
      groupId: PredefinedGroupId.DSA,
    },
    { id: "dp", name: "Dynamic Programming", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "greedy", name: "Greedy", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "backtracking", name: "Backtracking", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "dfs", name: "DFS", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "bfs", name: "BFS", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "sorting", name: "Sorting", isCustom: false, groupId: PredefinedGroupId.DSA },
    { id: "math", name: "Math", isCustom: false, groupId: PredefinedGroupId.DSA },
    {
      id: "bit-manipulation",
      name: "Bit Manipulation",
      isCustom: false,
      groupId: PredefinedGroupId.DSA,
    },
  ];