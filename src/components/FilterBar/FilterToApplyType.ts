import type { DifficultyTagId } from "../../model";


export type FilterToApplyType = {
  readonly tagId: string | null;
  readonly difficultyId: DifficultyTagId | null;
  readonly completionStatus: 'All' | 'Done' | 'Pending';
}

export const DEFAULT_FILTER_TO_APPLY: FilterToApplyType = {
    tagId: null,
    difficultyId: null,
    completionStatus: 'All',
}

