import React, { memo, useCallback, useMemo } from "react";
import { Select } from "../../sharedStyles";
import type { Tag } from "../../model";
import { useSelector } from "react-redux";
import {
  selectTagsBySelectedGroup,
  selectTaskCountByTags,
  selectTagIdsFilter,
  setTagIdsFilter,
  useAppDispatch,
} from "../../store";

const ALL_TAGS: Tag = {
  id: "ALL",
  name: "All Tags",
  isCustom: false,
  groupId: null,
};

export const TagsFilter = memo(() => {
  const tagsBySelectedGroup = useSelector(selectTagsBySelectedGroup);
  const tasksCountByTags = useSelector(selectTaskCountByTags);
  const tagIdsFilter = useSelector(selectTagIdsFilter);
  const dispatch = useAppDispatch();

  const source = useMemo(() => {
    return [ALL_TAGS, ...tagsBySelectedGroup];
  }, [tagsBySelectedGroup]);

  const selectedValues: ReadonlyArray<string> = useMemo(
    () => (tagIdsFilter.length === 0 ? [ALL_TAGS.id] : tagIdsFilter),
    [tagIdsFilter]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );

      // "All" clears the filter
      if (selected.includes(ALL_TAGS.id)) {
        dispatch(setTagIdsFilter([]));
        return;
      }

      dispatch(setTagIdsFilter(selected));
    },
    [dispatch]
  );

  const getCountForTags = useCallback(
    (tagId: string): number => {
      if (tagId === ALL_TAGS.id) {
        return tagsBySelectedGroup.reduce(
          (sum, tag) => sum + (tasksCountByTags[tag.id] ?? 0),
          0
        );
      }

      return tasksCountByTags[tagId] ?? 0;
    },
    [tagsBySelectedGroup, tasksCountByTags]
  );
  return (
    <Select value={selectedValues[0]} onChange={handleChange}>
      {source.map((tag) => {
        const count = getCountForTags(tag.id);
        return (
          <option key={tag.id} value={tag.id}>
            {tag.name} ({count})
          </option>
        );
      })}
    </Select>
  );
});
