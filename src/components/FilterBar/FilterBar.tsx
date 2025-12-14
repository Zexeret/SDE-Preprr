import React, { useMemo } from "react";
import { FiFilter } from "react-icons/fi";
import type { Tag, SortBy, SortOrder, PreparationTask } from "../../model";
import { DIFFICULTY_TAGS, DSA_SPECIFIC_TAGS } from "../../constants/index";
import { buttonSecondaryStyles } from "../../styles";
import { filterBarContainerStyles, selectStyles } from "./FilterBar.styles";

interface FilterBarProps {
  readonly customTags: ReadonlyArray<Tag>;
  readonly selectedFilterTags: ReadonlyArray<string>;
  readonly sortBy: SortBy;
  readonly sortOrder: SortOrder;
  readonly groupByTag: boolean;
  readonly showDoneOnly: boolean;
  readonly showUndoneOnly: boolean;
  readonly tasks: ReadonlyArray<PreparationTask>;
  readonly selectedDifficulty: ReadonlyArray<string>;
  readonly selectedGroupId: string;
  readonly onFilterTagsChange: (tags: ReadonlyArray<string>) => void;
  readonly onSortByChange: (sortBy: SortBy) => void;
  readonly onSortOrderChange: (sortOrder: SortOrder) => void;
  readonly onGroupByTagChange: (group: boolean) => void;
  readonly onShowDoneOnlyChange: (show: boolean) => void;
  readonly onShowUndoneOnlyChange: (show: boolean) => void;
  readonly onDifficultyChange: (difficulty: ReadonlyArray<string>) => void;
  readonly onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  customTags,
  selectedFilterTags,
  sortBy,
  sortOrder,
  groupByTag,
  showDoneOnly,
  showUndoneOnly,
  tasks,
  selectedDifficulty,
  selectedGroupId,
  onFilterTagsChange,
  onSortByChange,
  onSortOrderChange,
  onGroupByTagChange,
  onShowDoneOnlyChange,
  onShowUndoneOnlyChange,
  onDifficultyChange,
  onClearFilters,
}) => {
  // Get topic tags based on selected group
  const topicTags = useMemo(() => {
    const groupCustomTags = customTags.filter(
      (tag) => tag.groupId === selectedGroupId
    );

    if (selectedGroupId === "dsa") {
      return [...DSA_SPECIFIC_TAGS, ...groupCustomTags];
    }

    return groupCustomTags;
  }, [customTags, selectedGroupId]);

  const hasActiveFilters =
    selectedFilterTags.length > 0 ||
    showDoneOnly ||
    showUndoneOnly ||
    selectedDifficulty.length > 0;

  const getTagCount = (tagId: string): number => {
    return tasks.filter((task) => task.tags.some((tag) => tag.id === tagId))
      .length;
  };

  return (
    <div className={filterBarContainerStyles}>
      <select
        className={selectStyles}
        value={selectedDifficulty[0] || ""}
        onChange={(e) => {
          if (e.target.value) {
            onDifficultyChange([e.target.value]);
          } else {
            onDifficultyChange([]);
          }
        }}
      >
        <option value="">All Difficulties ({tasks.length})</option>
        {DIFFICULTY_TAGS.map((tag) => {
          const count = getTagCount(tag.id);
          return (
            <option key={tag.id} value={tag.id}>
              {tag.name} ({count})
            </option>
          );
        })}
      </select>

      {topicTags.length > 0 && (
        <select
          className={selectStyles}
          value={selectedFilterTags[0] || ""}
          onChange={(e) => {
            if (e.target.value) {
              onFilterTagsChange([e.target.value]);
            } else {
              onFilterTagsChange([]);
            }
          }}
        >
          <option value="">All Topics ({tasks.length})</option>
          {topicTags.map((tag) => {
            const count = getTagCount(tag.id);
            return (
              <option key={tag.id} value={tag.id}>
                {tag.name} ({count})
              </option>
            );
          })}
        </select>
      )}

      <select
        className={selectStyles}
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortBy)}
      >
        <option value="dateAdded">Date Added</option>
        <option value="dateUpdated">Last Updated</option>
        <option value="status">Status</option>
      </select>

      <select
        className={selectStyles}
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      <select
        className={selectStyles}
        value={showDoneOnly ? "done" : showUndoneOnly ? "undone" : "all"}
        onChange={(e) => {
          onShowDoneOnlyChange(e.target.value === "done");
          onShowUndoneOnlyChange(e.target.value === "undone");
        }}
      >
        <option value="all">All Tasks</option>
        <option value="done">Completed Only</option>
        <option value="undone">Pending Only</option>
      </select>

      {topicTags.length > 0 && (
        <select
          className={selectStyles}
          value={groupByTag ? "yes" : "no"}
          onChange={(e) => onGroupByTagChange(e.target.value === "yes")}
        >
          <option value="no">No Grouping</option>
          <option value="yes">Group by Tag</option>
        </select>
      )}

      {hasActiveFilters && (
        <button className={buttonSecondaryStyles} onClick={onClearFilters}>
          <FiFilter size={16} />
          Clear Filters
        </button>
      )}
    </div>
  );
};
