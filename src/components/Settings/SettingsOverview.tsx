import  { memo } from "react";
import {
  SettingsSection,
  SettingsSectionTitle,
  StatCardSettings,
  StatLabelSettings,
  StatsGrid,
  StatValueSettings,
} from "./Settings.styles";
import { FiBarChart2 } from "react-icons/fi";
import { useTaskUtility } from "../../context";
import { PREDEFINED_GROUPS } from "../../constants";

export const SettingsOverview = memo(() => {
  const { tasks, customGroups, customTags } = useTaskUtility();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isDone).length;
  const totalGroups = customGroups.length + PREDEFINED_GROUPS.length;
  const totalCustomTags = customTags.length;
  
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
          <StatLabelSettings>Groups</StatLabelSettings>
          <StatValueSettings>{totalGroups}</StatValueSettings>
        </StatCardSettings>
        <StatCardSettings>
          <StatLabelSettings>Custom Tags</StatLabelSettings>
          <StatValueSettings>{totalCustomTags}</StatValueSettings>
        </StatCardSettings>
      </StatsGrid>
    </SettingsSection>
  );
});
