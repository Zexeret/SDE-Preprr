import type { Group } from "../model";

export enum PredefinedGroupId {
  DSA = "DSA",
  SYSTEM_DESIGN = "SYSTEM_DESIGN",
}

export const PREDEFINED_GROUPS: ReadonlyArray<Group> = [
  {
    id: PredefinedGroupId.DSA,
    name: "DSA Problems",
    isCustom: false,
    createdAt: Date.now(),
  },
  {
    id: PredefinedGroupId.SYSTEM_DESIGN,
    name: "System Design",
    isCustom: false,
    createdAt: Date.now(),
  },
];
