import { memo, useMemo } from "react";
import { StatCard, StatsBar, ValueContainer } from "./Stats.styles";
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
        <ValueContainer $variant='info'>{totalTasks}</ValueContainer>
      </StatCard>
      <StatCard>
        <div className="label">Completed</div>
        <ValueContainer $variant='success'>{completedTasks}</ValueContainer> 
      </StatCard>
      <StatCard>
        <div className="label">Pending</div>
        <ValueContainer $variant='warning'>{pendingTasks}</ValueContainer>
      </StatCard>
      <StatCard>
        <div className="label">Completion Rate</div>
        <ValueContainer $variant='info'>{completionRate}%</ValueContainer>
      </StatCard>
    </StatsBar>
  );
});
