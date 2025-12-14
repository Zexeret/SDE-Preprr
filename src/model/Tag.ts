export type Tag = {
  readonly id: string;
  readonly name: string;
  readonly isCustom: boolean;
  readonly groupId?: string; // Optional: if present, tag is specific to this group
};
