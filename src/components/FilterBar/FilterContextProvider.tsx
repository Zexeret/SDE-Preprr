import React, { useMemo, useState, type ReactNode } from "react";
import { FilterContext, type FilterContextType } from "./useFilterContext";
import { useTaskUtility } from "../../context";
import {
  DEFAULT_FILTER_TO_APPLY,
  type FilterToApplyType,
} from "./FilterToApplyType";
import type { PreparationTask } from "../../model";
import { getFilteredTasks } from "./getFilteredTasks";

export const FilterContextProvider: React.FC<{
  readonly children: ReactNode;
}> = ({ children }) => {
  const { tasks, selectedGroupId } = useTaskUtility();
  const [showTags, setShowTags] = useState<boolean>(true);
  const [showDifficulty, setShowDifficulty] = useState<boolean>(true);
  const [currentFilterToApply, setCurrentFilterToApply] =
    useState<FilterToApplyType>(DEFAULT_FILTER_TO_APPLY);

  const filteredAndSortedTasks = useMemo<ReadonlyArray<PreparationTask>>(() => {
    if (!selectedGroupId) return [];
    return getFilteredTasks(tasks, selectedGroupId, currentFilterToApply);
  }, [currentFilterToApply, selectedGroupId, tasks]);

  const value: FilterContextType = useMemo(
    () => ({
      filteredAndSortedTasks,
      showTags,
      setShowTags,
      showDifficulty,
      setShowDifficulty,
      currentFilterToApply,
      setCurrentFilterToApply,
    }),
    [currentFilterToApply, filteredAndSortedTasks, showDifficulty, showTags]
  );
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
