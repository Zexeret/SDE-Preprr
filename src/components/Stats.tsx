import React from "react";
import type { PreparationTask } from "../types";
import { StatsBar, StatCard } from "../styled";

interface StatsProps {
  readonly tasks: ReadonlyArray<PreparationTask>;
}

export const Stats: React.FC<StatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isDone).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <StatsBar>
      <StatCard>
        <div className="label">Total Tasks</div>
        <div className="value">{totalTasks}</div>
      </StatCard>
      <StatCard>
        <div className="label">Completed</div>
        <div className="value" style={{ color: "#10b981" }}>
          {completedTasks}
        </div>
      </StatCard>
      <StatCard>
        <div className="label">Pending</div>
        <div className="value" style={{ color: "#f59e0b" }}>
          {pendingTasks}
        </div>
      </StatCard>
      <StatCard>
        <div className="label">Completion Rate</div>
        <div className="value">{completionRate}%</div>
      </StatCard>
    </StatsBar>
  );
};
