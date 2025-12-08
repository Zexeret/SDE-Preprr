import React from "react";
import type{ Problem } from "../types";
import { StatsBar, StatCard } from "../styled";

interface StatsProps {
  problems: Problem[];
}

export const Stats: React.FC<StatsProps> = ({ problems }) => {
  const totalProblems = problems.length;
  const completedProblems = problems.filter((p) => p.isDone).length;
  const pendingProblems = totalProblems - completedProblems;
  const completionRate =
    totalProblems > 0
      ? Math.round((completedProblems / totalProblems) * 100)
      : 0;

  return (
    <StatsBar>
      <StatCard>
        <div className="label">Total Problems</div>
        <div className="value">{totalProblems}</div>
      </StatCard>
      <StatCard>
        <div className="label">Completed</div>
        <div className="value" style={{ color: "#10b981" }}>
          {completedProblems}
        </div>
      </StatCard>
      <StatCard>
        <div className="label">Pending</div>
        <div className="value" style={{ color: "#f59e0b" }}>
          {pendingProblems}
        </div>
      </StatCard>
      <StatCard>
        <div className="label">Completion Rate</div>
        <div className="value">{completionRate}%</div>
      </StatCard>
    </StatsBar>
  );
};
