import React, { useCallback } from "react";
import {
  SettingsActions,
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionTitle,
} from "./Settings.styles";
import { FiRefreshCw } from "react-icons/fi";
import { useTaskUtility } from "../../context";
import { ButtonDanger } from "../../sharedStyles";

export const SettingsResetProgress = () => {
  const { tasks, setTasks } = useTaskUtility();

  const handleResetAll = useCallback(() => {
    if (
      window.confirm(
        "Are you sure you want to reset ALL progress? This will mark all tasks as undone across all groups. This action cannot be undone."
      )
    ) {
      setTasks(
        tasks.map((task) => ({
          ...task,
          isDone: false,
          updatedAt: Date.now(),
        }))
      );
    }
  }, [setTasks, tasks]);
  
  return (
    <SettingsSection>
      <SettingsSectionTitle>
        <FiRefreshCw />
        Reset Progress
      </SettingsSectionTitle>
      <SettingsSectionDescription>
        Mark all tasks across all groups as undone. This action cannot be
        undone.
      </SettingsSectionDescription>
      <SettingsActions>
        <ButtonDanger
          onClick={handleResetAll}
          disabled={tasks.length === 0 || !tasks.some((t) => t.isDone)}
        >
          <FiRefreshCw size={16} />
          Reset All Progress
        </ButtonDanger>
      </SettingsActions>
    </SettingsSection>
  );
};
