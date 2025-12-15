import React, { useRef } from "react";
import {
  FiDownload,
  FiUpload,
  FiRefreshCw,
  FiDroplet,
  FiDatabase,
  FiBarChart2,
} from "react-icons/fi";
import type { PreparationTask, Tag, Group } from "../../model";
import { exportData, importData } from "../../utils";
import {
  buttonPrimaryStyles,
  buttonSecondaryStyles,
  buttonDangerStyles,
  fileInputHiddenStyles,
  fileInputLabelStyles,
} from "../../styles";
import {
  settingsPageStyles,
  settingsHeaderStyles,
  settingsTitleStyles,
  settingsSubtitleStyles,
  settingsSectionStyles,
  settingsSectionTitleStyles,
  settingsSectionDescriptionStyles,
  settingsActionsStyles,
  themeOptionsStyles,
  themeOptionStyles,
  themeOptionActiveStyles,
  themeOptionNameStyles,
  themePreviewStyles,
  themePreviewColorStyles,
  statsGridStyles,
  statCardSettingsStyles,
  statLabelSettingsStyles,
  statValueSettingsStyles,
} from "./Settings.styles";

interface SettingsProps {
  readonly tasks: ReadonlyArray<PreparationTask>;
  readonly customTags: ReadonlyArray<Tag>;
  readonly customGroups: ReadonlyArray<Group>;
  readonly onImport: (data: {
    tasks: Array<PreparationTask>;
    customTags?: Array<Tag>;
    customGroups?: Array<Group>;
  }) => void;
  readonly onResetAll: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  tasks,
  customTags,
  customGroups,
  onImport,
  onResetAll,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportData(tasks, customTags, customGroups);
  };

  const handleImportChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importData(file);

      if (
        window.confirm(
          `This will import ${data.tasks.length} tasks, ${
            data.customTags?.length || 0
          } custom tags, and ${
            data.customGroups?.length || 0
          } custom groups. Continue?`
        )
      ) {
        onImport(data);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to import data");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleResetAll = () => {
    if (
      window.confirm(
        "Are you sure you want to reset ALL progress? This will mark all tasks as undone across all groups. This action cannot be undone."
      )
    ) {
      onResetAll();
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isDone).length;
  const totalGroups = customGroups.length + 4; // 4 predefined groups
  const totalCustomTags = customTags.length;

  return (
    <div className={settingsPageStyles}>
      <div className={settingsHeaderStyles}>
        <h1 className={settingsTitleStyles}>Settings</h1>
        <p className={settingsSubtitleStyles}>
          Manage your preferences and data
        </p>
      </div>

      <div className={settingsSectionStyles}>
        <h2 className={settingsSectionTitleStyles}>
          <FiBarChart2 />
          Overview
        </h2>
        <div className={statsGridStyles}>
          <div className={statCardSettingsStyles}>
            <div className={statLabelSettingsStyles}>Total Tasks</div>
            <div className={statValueSettingsStyles}>{totalTasks}</div>
          </div>
          <div className={statCardSettingsStyles}>
            <div className={statLabelSettingsStyles}>Completed</div>
            <div className={statValueSettingsStyles}>{completedTasks}</div>
          </div>
          <div className={statCardSettingsStyles}>
            <div className={statLabelSettingsStyles}>Groups</div>
            <div className={statValueSettingsStyles}>{totalGroups}</div>
          </div>
          <div className={statCardSettingsStyles}>
            <div className={statLabelSettingsStyles}>Custom Tags</div>
            <div className={statValueSettingsStyles}>{totalCustomTags}</div>
          </div>
        </div>
      </div>

      <div className={settingsSectionStyles}>
        <h2 className={settingsSectionTitleStyles}>
          <FiDroplet />
          Theme
        </h2>
        <p className={settingsSectionDescriptionStyles}>
          Choose your preferred color theme (Coming Soon)
        </p>
        <div className={themeOptionsStyles}>
          <div className={themeOptionActiveStyles}>
            <div className={themePreviewStyles}>
              <span
                className={themePreviewColorStyles}
                style={{ background: "#6366f1" }}
              />
              <span
                className={themePreviewColorStyles}
                style={{ background: "#8b5cf6" }}
              />
              <span
                className={themePreviewColorStyles}
                style={{ background: "#0f172a" }}
              />
            </div>
            <div className={themeOptionNameStyles}>Dark (Default)</div>
          </div>
          <div className={themeOptionStyles}>
            <div className={themePreviewStyles}>
              <span
                className={themePreviewColorStyles}
                style={{ background: "#3b82f6" }}
              />
              <span
                className={themePreviewColorStyles}
                style={{ background: "#06b6d4" }}
              />
              <span
                className={themePreviewColorStyles}
                style={{ background: "#1e293b" }}
              />
            </div>
            <div className={themeOptionNameStyles}>Blue</div>
          </div>
          <div className={themeOptionStyles}>
            <div className={themePreviewStyles}>
              <span
                className={themePreviewColorStyles}
                style={{ background: "#10b981" }}
              />
              <span
                className={themePreviewColorStyles}
                style={{ background: "#059669" }}
              />
              <span
                className={themePreviewColorStyles}
                style={{ background: "#064e3b" }}
              />
            </div>
            <div className={themeOptionNameStyles}>Green</div>
          </div>
        </div>
      </div>

      <div className={settingsSectionStyles}>
        <h2 className={settingsSectionTitleStyles}>
          <FiDatabase />
          Data Management
        </h2>
        <p className={settingsSectionDescriptionStyles}>
          Export your data as JSON or import from a previous backup
        </p>
        <div className={settingsActionsStyles}>
          <button
            className={buttonPrimaryStyles}
            onClick={handleExport}
            disabled={tasks.length === 0}
          >
            <FiDownload size={16} />
            Export Data
          </button>
          <label
            htmlFor="import-file-settings"
            className={fileInputLabelStyles}
          >
            <FiUpload size={16} />
            Import Data
          </label>
          <input
            id="import-file-settings"
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleImportChange}
            className={fileInputHiddenStyles}
          />
        </div>
      </div>

      <div className={settingsSectionStyles}>
        <h2 className={settingsSectionTitleStyles}>
          <FiRefreshCw />
          Reset Progress
        </h2>
        <p className={settingsSectionDescriptionStyles}>
          Mark all tasks across all groups as undone. This action cannot be
          undone.
        </p>
        <div className={settingsActionsStyles}>
          <button
            className={buttonDangerStyles}
            onClick={handleResetAll}
            disabled={tasks.length === 0 || !tasks.some((t) => t.isDone)}
          >
            <FiRefreshCw size={16} />
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
};
