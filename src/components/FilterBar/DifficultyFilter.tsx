import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Select } from "../../sharedStyles";
import {
  selectDifficultyFilter,
  setDifficultyFilter,
  useAppDispatch,
} from "../../store";
import { selectTaskCountByDifficulty } from "../../store";
import {
  DIFFICULTY_TAGS,
  DifficultyTagId,
  type Tag,
} from "../../model";


const ALL_TAG_ID = "ALL" as const;
type AllDifficultyId = typeof ALL_TAG_ID;

type DifficultySelectValue = DifficultyTagId | AllDifficultyId;

const DIFFICULTY_FILTER_OPTIONS: ReadonlyArray<Tag<DifficultySelectValue>> = [
  {
    id: ALL_TAG_ID,
    name: "All Difficulties",
    isCustom: false,
    groupId: null
  },
  ...DIFFICULTY_TAGS,
];

export const DifficultyFilter = memo(() => {
  const dispatch = useAppDispatch();

  const difficultyFilter = useSelector(selectDifficultyFilter);
  const taskCountByDifficulty = useSelector(selectTaskCountByDifficulty);

  const selectedValues: ReadonlyArray<DifficultySelectValue> = useMemo(
    () =>
      difficultyFilter.length === 0
        ? [ALL_TAG_ID]
        : difficultyFilter,
    [difficultyFilter]
  );


  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = Array.from(e.target.selectedOptions).map(
        (option) => option.value as DifficultySelectValue
      );

      // "All" clears the filter
      if (selected.includes(ALL_TAG_ID)) {
        dispatch(setDifficultyFilter([]));
        return;
      }

      dispatch(
        setDifficultyFilter(selected as ReadonlyArray<DifficultyTagId>)
      );
    },
    [dispatch]
  );


  const getCountForDifficulty = useCallback(
    (difficultyId: DifficultySelectValue): number => {
      if (difficultyId === ALL_TAG_ID) {
        return Object.values(DifficultyTagId).reduce(
          (sum, id) => sum + (taskCountByDifficulty[id] ?? 0),
          0
        );
      }

      return taskCountByDifficulty[difficultyId] ?? 0;
    },
    [taskCountByDifficulty]
  );

  return (
    <Select
      // multiple    TODO: fix the styling issue
      value={selectedValues[0]}
      onChange={handleChange}
    >
      {DIFFICULTY_FILTER_OPTIONS.map(({ id, name }) => (
        <option key={id} value={id}>
          {name} ({getCountForDifficulty(id)})
        </option>
      ))}
    </Select>
  );
});
