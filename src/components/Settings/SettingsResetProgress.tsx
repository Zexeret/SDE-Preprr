import { useCallback } from "react";
import {
  SettingsActions,
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionTitle,
} from "./Settings.styles";
import { FiRefreshCw } from "react-icons/fi";
import { ButtonDanger } from "../../sharedStyles";
import { selectAllTasks, setAllTasks, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";

export const SettingsResetProgress = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectAllTasks);

  const handleResetAll = useCallback(() => {
    if (
      window.confirm(
        "Are you sure you want to reset ALL progress? This will mark all tasks as undone across all groups. This action cannot be undone."
      )
    ) {
      dispatch(
        setAllTasks(
          tasks.map((task) => ({
            ...task,
            isDone: false,
            updatedAt: Date.now(),
          }))
        )
      );
    }
  }, [dispatch, tasks]);

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
