import React, { memo, useCallback } from "react";
import { Select } from "../../sharedStyles";
import { useSelector } from "react-redux";
import {
  useAppDispatch,
  selectTaskCountByCompletionStatus,
  type TaskCompletionStatus,
  selectCompletionStatusFilter,
  setCompletionStatusFilter,
} from "../../store";

const COMPLETION_FILTER_SOURCE: Record<TaskCompletionStatus, string> = {
  All: "All Tasks",
  Done: "Completed Tasks",
  Pending: "Pending Tasks",
};

export const CompletionFilter = memo(() => {
  const completionStatusFilter = useSelector(selectCompletionStatusFilter);
  const tasksCountByCompletionStatus = useSelector(
    selectTaskCountByCompletionStatus
  );
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      ) as ReadonlyArray<TaskCompletionStatus>;

      dispatch(setCompletionStatusFilter(selected[0]));
    },
    [dispatch]
  );

  return (
    <Select value={completionStatusFilter} onChange={handleChange}>
      {Object.keys(COMPLETION_FILTER_SOURCE).map((completionStatus) => {
        const status = completionStatus as TaskCompletionStatus;
        const count = tasksCountByCompletionStatus[status];
        return (
          <option key={status} value={status}>
            {COMPLETION_FILTER_SOURCE[status]} ({count})
          </option>
        );
      })}
    </Select>
  );
});
