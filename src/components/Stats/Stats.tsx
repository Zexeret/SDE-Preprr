import React from "react";
import type { PreparationTask } from "../../model";
import { calculateCompletionRate } from "../../utils";
import {
  statsBarStyles,
  statCardStyles,
  statLabelStyles,
  statValueStyles,
  statValueSuccessStyles,
  statValueWarningStyles,
} from "./Stats.styles";

interface StatsProps {
  readonly tasks: ReadonlyArray<PreparationTask>;
}

export const Stats: React.FC<StatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isDone).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = calculateCompletionRate(completedTasks, totalTasks);

  return (
    <div className={statsBarStyles}>
      <div className={statCardStyles}>
        <div className={statLabelStyles}>Total Tasks</div>
        <div className={statValueStyles}>{totalTasks}</div>
      </div>
      <div className={statCardStyles}>
        <div className={statLabelStyles}>Completed</div>
        <div className={statValueSuccessStyles}>{completedTasks}</div>
      </div>
      <div className={statCardStyles}>
        <div className={statLabelStyles}>Pending</div>
        <div className={statValueWarningStyles}>{pendingTasks}</div>
      </div>
      <div className={statCardStyles}>
        <div className={statLabelStyles}>Completion Rate</div>
        <div className={statValueStyles}>{completionRate}%</div>
      </div>
    </div>
  );
};
