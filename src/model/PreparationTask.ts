import type { Tag } from "./Tag";


export type PreparationTask = {
  readonly taskId: string;
  readonly groupId: string;
  readonly link: string;
  readonly tags: ReadonlyArray<Tag>;
  readonly notes: string;
  readonly isDone: boolean;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly order: number;
}