export type Group = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly isCustom: boolean;
  readonly createdAt: number;
};

export enum PredefinedGroupId {
  DSA = "DSA",
  SYSTEM_DESIGN = "SYSTEM_DESIGN",
}

export const PREDEFINED_GROUPS: ReadonlyArray<Group> = [
  {
    id: PredefinedGroupId.DSA,
    name: "DSA Problems",
    description: "Manage your DSA journey. Solve them all!",
    isCustom: false,
    createdAt: Date.now(),
  },
  {
    id: PredefinedGroupId.SYSTEM_DESIGN,
    name: "System Design",
    description: "System Design Notes and Questions",
    isCustom: false,
    createdAt: Date.now(),
  },
];
