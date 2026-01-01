import { memo, useCallback } from "react";
import { FiFilter } from "react-icons/fi";
import { FilterBarContainer } from "./FilterBar.styles";
import { ButtonSecondary } from "../../sharedStyles";
import { VisibilityFilters } from "./VisibilityFilters";
import { DifficultyFilter } from "./DifficultyFilter";
import { resetFilters, useAppDispatch } from "../../store";
import { TagsFilter } from "./TagsFilter";
import { CompletionFilter } from "./CompletionFilter";

export const FilterBar = memo(() => {
  const dispatch = useAppDispatch();

  const handleClearFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return (
    <FilterBarContainer>
      <DifficultyFilter />

      <TagsFilter />

      <CompletionFilter />

      <VisibilityFilters />

      <ButtonSecondary onClick={handleClearFilters}>
        <FiFilter size={16} />
        Clear Filters
      </ButtonSecondary>
    </FilterBarContainer>
  );
});
