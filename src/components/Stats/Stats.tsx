import { memo, useMemo } from "react";
import { StatCard, StatsBar } from "./Stats.styles";
import { useTaskUtility } from "../../context";

export const Stats = memo(() => {
  const { tasks, selectedGroupId } = useTaskUtility();

  const tasksByGroup = useMemo(
    () => tasks.filter((task) => task.groupId === selectedGroupId),
    [selectedGroupId, tasks]
  );
  const totalTasks = tasksByGroup.length;
  const completedTasks = tasksByGroup.filter((t) => t.isDone).length;
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
});
