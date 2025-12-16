export type Tag<T= string> = {
  readonly id: T;
  readonly name: string;
  readonly isCustom: boolean;
  readonly groupId?: string; // Optional: if present, tag is specific to this group
};