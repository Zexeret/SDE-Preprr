import { memo } from "react";
import {
  SettingsSection,
  SettingsSectionTitle,
  StatCardSettings,
  StatLabelSettings,
  StatsGrid,
  StatValueSettings,
} from "./Settings.styles";
import { FiBarChart2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  selectCompletedTasksCount,
  selectCustomGroupsCount,
  selectCustomTagsCount,
  selectTasksCount,
} from "../../store";

export const SettingsOverview = memo(() => {
  const totalTasks = useSelector(selectTasksCount);
  const completedTasks = useSelector(selectCompletedTasksCount);
  const customGroupsCount = useSelector(selectCustomGroupsCount);
  const customTagCounts = useSelector(selectCustomTagsCount);

  return (
    <SettingsSection>
      <SettingsSectionTitle>
        <FiBarChart2 />
        Overview
      </SettingsSectionTitle>
      <StatsGrid>
        <StatCardSettings>
          <StatLabelSettings>Total Tasks</StatLabelSettings>
          <StatValueSettings>{totalTasks}</StatValueSettings>
        </StatCardSettings>
        <StatCardSettings>
          <StatLabelSettings>Completed</StatLabelSettings>
          <StatValueSettings>{completedTasks}</StatValueSettings>
        </StatCardSettings>
        <StatCardSettings>
          <StatLabelSettings>Custom Groups</StatLabelSettings>
          <StatValueSettings>{customGroupsCount}</StatValueSettings>
        </StatCardSettings>
        <StatCardSettings>
          <StatLabelSettings>Custom Tags</StatLabelSettings>
          <StatValueSettings>{customTagCounts}</StatValueSettings>
        </StatCardSettings>
      </StatsGrid>
    </SettingsSection>
  );
});
