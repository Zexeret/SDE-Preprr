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
import { useDialog } from "../Dialog";

export const SettingsResetProgress = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectAllTasks);
  const { confirm } = useDialog();

  const handleResetAll = useCallback(async () => {
    const confirmed = await confirm({
      title: "Reset All Progress",
      message:
        "Are you sure you want to reset ALL progress? This will mark all tasks as undone across all groups. This action cannot be undone.",
      confirmText: "Reset All",
      isDangerous: true,
    });
    if (confirmed) {
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
  }, [confirm, dispatch, tasks]);

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
