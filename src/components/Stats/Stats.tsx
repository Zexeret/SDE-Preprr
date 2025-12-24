import { memo } from "react";
import { StatCard, StatLabel, StatsBar, StatValue } from "./Stats.styles";
import { useSelector } from "react-redux";
import { selectTasksByGroupId } from "../../store";

export const Stats = memo(() => {
  const tasksByGroup = useSelector(selectTasksByGroupId);

  const totalTasks = tasksByGroup.length;
  const completedTasks = tasksByGroup.filter((t) => t.isDone).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <StatsBar>
      <StatCard>
        <StatLabel>Total Tasks</StatLabel>
        <StatValue>{totalTasks}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>Completed</StatLabel>
        <StatValue>{completedTasks}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>Pending</StatLabel>
        <StatValue>{pendingTasks}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>Completion Rate</StatLabel>
        <StatValue>{completionRate}%</StatValue>
      </StatCard>
    </StatsBar>
  );
});
