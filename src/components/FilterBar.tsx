import React from "react";
import { FiFilter } from "react-icons/fi";
import type { Tag, SortBy, SortOrder, Problem } from "../types";
import { PREDEFINED_TAGS } from "../constants";
import { FilterBar as StyledFilterBar, Select, Button } from "../styled";

interface FilterBarProps {
  customTags: Tag[];
  selectedFilterTags: string[];
  sortBy: SortBy;
  sortOrder: SortOrder;
  groupByTag: boolean;
  showDoneOnly: boolean;
  showUndoneOnly: boolean;
  problems: Problem[];
  selectedDifficulty: string[];
  onFilterTagsChange: (tags: string[]) => void;
  onSortByChange: (sortBy: SortBy) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  onGroupByTagChange: (group: boolean) => void;
  onShowDoneOnlyChange: (show: boolean) => void;
  onShowUndoneOnlyChange: (show: boolean) => void;
  onDifficultyChange: (difficulty: string[]) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  customTags,
  selectedFilterTags,
  sortBy,
  sortOrder,
  groupByTag,
  showDoneOnly,
  showUndoneOnly,
  problems,
  selectedDifficulty,
  onFilterTagsChange,
  onSortByChange,
  onSortOrderChange,
  onGroupByTagChange,
  onShowDoneOnlyChange,
  onShowUndoneOnlyChange,
  onDifficultyChange,
  onClearFilters,
}) => {
  const difficultyTags = PREDEFINED_TAGS.filter((tag) =>
    ["easy", "medium", "hard"].includes(tag.id)
  );
  const topicTags = [
    ...PREDEFINED_TAGS.filter(
      (tag) => !["easy", "medium", "hard"].includes(tag.id)
    ),
    ...customTags,
  ];

  const hasActiveFilters =
    selectedFilterTags.length > 0 ||
    showDoneOnly ||
    showUndoneOnly ||
    selectedDifficulty.length > 0;

  // Calculate problem count for each tag
  const getTagCount = (tagId: string): number => {
    return problems.filter((problem) =>
      problem.tags.some((tag) => tag.id === tagId)
    ).length;
  };

  return (
    <StyledFilterBar>
      <Select
        value={selectedDifficulty[0] || ""}
        onChange={(e) => {
          if (e.target.value) {
            onDifficultyChange([e.target.value]);
          } else {
            onDifficultyChange([]);
          }
        }}
      >
        <option value="">All Difficulties ({problems.length})</option>
        {difficultyTags.map((tag) => {
          const count = getTagCount(tag.id);
          return (
            <option key={tag.id} value={tag.id}>
              {tag.name} ({count})
            </option>
          );
        })}
      </Select>

      <Select
        value={selectedFilterTags[0] || ""}
        onChange={(e) => {
          if (e.target.value) {
            onFilterTagsChange([e.target.value]);
          } else {
            onFilterTagsChange([]);
          }
        }}
      >
        <option value="">All Topics ({problems.length})</option>
        {topicTags.map((tag) => {
          const count = getTagCount(tag.id);
          return (
            <option key={tag.id} value={tag.id}>
              {tag.name} ({count})
            </option>
          );
        })}
      </Select>

      <Select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortBy)}
      >
        <option value="dateAdded">Date Added</option>
        <option value="dateUpdated">Last Updated</option>
        <option value="status">Status</option>
      </Select>

      <Select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </Select>

      <Select
        value={showDoneOnly ? "done" : showUndoneOnly ? "undone" : "all"}
        onChange={(e) => {
          onShowDoneOnlyChange(e.target.value === "done");
          onShowUndoneOnlyChange(e.target.value === "undone");
        }}
      >
        <option value="all">All Problems</option>
        <option value="done">Completed Only</option>
        <option value="undone">Pending Only</option>
      </Select>

      <Select
        value={groupByTag ? "yes" : "no"}
        onChange={(e) => onGroupByTagChange(e.target.value === "yes")}
      >
        <option value="no">No Grouping</option>
        <option value="yes">Group by Tag</option>
      </Select>

      {hasActiveFilters && (
        <Button variant="secondary" onClick={onClearFilters}>
          <FiFilter size={16} />
          Clear Filters
        </Button>
      )}
    </StyledFilterBar>
  );
};
