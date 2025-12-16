import React, { memo, useCallback, useMemo } from "react";
import { FiFilter } from "react-icons/fi";
import { DIFFICULTY_TAGS, DifficultyTagId, DSA_SPECIFIC_TAGS, type Tag } from "../../model";
import { FilterBarContainer } from "./FilterBar.styles";
import { ButtonSecondary, Select } from "../../sharedStyles";
import { useTaskUtility } from "../../context";
import { DEFAULT_FILTER_TO_APPLY } from "./FilterToApplyType";
import { useFilterContext } from "./useFilterContext";
import { VisibilityFilters } from "./VisibilityFilters";

type FilterBarProps = {};

const ALL_DIFFICULTY_TAG_ID = "All";
const DIFFICULTY_FILTER_SOURCE: ReadonlyArray<Tag> = [
  { id: ALL_DIFFICULTY_TAG_ID, name: "All Difficulties", isCustom: false },
  ...DIFFICULTY_TAGS,
];

export const FilterBar = memo<FilterBarProps>(() => {
  const { tasks, customTags, selectedGroupId } = useTaskUtility();
  const { currentFilterToApply, setCurrentFilterToApply } = useFilterContext();

  const tagsByGroupSource: ReadonlyArray<Tag> = useMemo(
    () => [
      { id: ALL_DIFFICULTY_TAG_ID, name: "All Topics", isCustom: false },
      ...DSA_SPECIFIC_TAGS.filter((tag) => tag.groupId === selectedGroupId),
      ...customTags.filter((tag) => tag.groupId === selectedGroupId),
    ],
    [customTags, selectedGroupId]
  );

  const tasksByGroup = useMemo(
    () => tasks.filter((task) => task.groupId === selectedGroupId),
    [tasks, selectedGroupId]
  );

  // Calculate task count for each tag
  const getTagCount = useCallback(
    (tagId: string): number => {
      if (tagId === ALL_DIFFICULTY_TAG_ID) return tasksByGroup.length;

      return tasksByGroup.filter((task) =>
        task.tags.some((tag) => tag.id === tagId)
      ).length;
    },
    [tasksByGroup]
  );

  // Calculate task count for each difficulty
  const getDifficultyCount = useCallback(
    (tagId: string): number => {
      if (tagId === ALL_DIFFICULTY_TAG_ID) return tasksByGroup.length;

      return tasksByGroup.filter((task) => task.difficulty === tagId).length;
    },
    [tasksByGroup]
  );

  const handleDifficultyFilterSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedDifficultyId = event.target.value;
      if (selectedDifficultyId === ALL_DIFFICULTY_TAG_ID) {
        setCurrentFilterToApply((prev) => ({
          ...prev,
          difficultyId: null,
        }));
      } else {
        setCurrentFilterToApply((prev) => ({
          ...prev,
          difficultyId: selectedDifficultyId as DifficultyTagId,
        }));
      }
    },
    [setCurrentFilterToApply]
  );

  const handleTagFilterSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const seletedTagId = event.target.value;
      if (seletedTagId === ALL_DIFFICULTY_TAG_ID) {
        setCurrentFilterToApply((prev) => ({
          ...prev,
          tagId: null,
        }));
      } else {
        setCurrentFilterToApply((prev) => ({
          ...prev,
          tagId: seletedTagId,
        }));
      }
    },
    [setCurrentFilterToApply]
  );

  const handleClearFilters = useCallback(() => {
    setCurrentFilterToApply(DEFAULT_FILTER_TO_APPLY);
  }, [setCurrentFilterToApply]);

  return (
    <FilterBarContainer>
      <Select
        value={currentFilterToApply.difficultyId ?? ALL_DIFFICULTY_TAG_ID}
        onChange={handleDifficultyFilterSelect}
      >
        {DIFFICULTY_FILTER_SOURCE.map((tag) => {
          const count = getDifficultyCount(tag.id);
          return (
            <option key={tag.id} value={tag.id}>
              {tag.name} ({count})
            </option>
          );
        })}
      </Select>

      <Select
        value={currentFilterToApply.tagId ?? ALL_DIFFICULTY_TAG_ID}
        onChange={handleTagFilterSelect}
      >
        {tagsByGroupSource.map((tag) => {
          const count = getTagCount(tag.id);
          return (
            <option key={tag.id} value={tag.id}>
              {tag.name} ({count})
            </option>
          );
        })}
      </Select>

      <VisibilityFilters />

      {/* <Select
        value={showDoneOnly ? "done" : showUndoneOnly ? "undone" : "all"}
        onChange={(e) => {
          onShowDoneOnlyChange(e.target.value === "done");
          onShowUndoneOnlyChange(e.target.value === "undone");
        }}
      >
        <option value="all">All Tasks</option>
        <option value="done">Completed Only</option>
        <option value="undone">Pending Only</option>
      </Select> */}

      {/* <Select
        value={groupByTag ? "yes" : "no"}
        onChange={(e) => onGroupByTagChange(e.target.value === "yes")}
      >
        <option value="no">No Grouping</option>
        <option value="yes">Group by Tag</option>
      </Select> */}

      <ButtonSecondary onClick={handleClearFilters}>
        <FiFilter size={16} />
        Clear Filters
      </ButtonSecondary>
    </FilterBarContainer>
  );
});
