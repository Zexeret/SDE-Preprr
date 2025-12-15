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
  ButtonPrimary,
  ButtonDanger,
  FileInputHidden,
  FileInputLabel,
} from "../../styles";
import {
  SettingsPage,
  SettingsHeader,
  SettingsTitle,
  SettingsSubtitle,
  SettingsSection,
  SettingsSectionTitle,
  SettingsSectionDescription,
  SettingsActions,
  ThemeOptions,
  ThemeOption,
  ThemeOptionName,
  ThemePreview,
  ThemePreviewColor,
  StatsGrid,
  StatCardSettings,
  StatLabelSettings,
  StatValueSettings,
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
    <SettingsPage>
      <SettingsHeader>
        <SettingsTitle>Settings</SettingsTitle>
        <SettingsSubtitle>Manage your preferences and data</SettingsSubtitle>
      </SettingsHeader>

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

      <SettingsSection>
        <SettingsSectionTitle>
          <FiDroplet />
          Theme
        </SettingsSectionTitle>
        <SettingsSectionDescription>
          Choose your preferred color theme (Coming Soon)
        </SettingsSectionDescription>
        <ThemeOptions>
          <ThemeOption $active={true}>
            <ThemePreview>
              <ThemePreviewColor $color="#6366f1" />
              <ThemePreviewColor $color="#8b5cf6" />
              <ThemePreviewColor $color="#0f172a" />
            </ThemePreview>
            <ThemeOptionName>Dark (Default)</ThemeOptionName>
          </ThemeOption>
          <ThemeOption $active={false}>
            <ThemePreview>
              <ThemePreviewColor $color="#3b82f6" />
              <ThemePreviewColor $color="#06b6d4" />
              <ThemePreviewColor $color="#1e293b" />
            </ThemePreview>
            <ThemeOptionName>Blue</ThemeOptionName>
          </ThemeOption>
          <ThemeOption $active={false}>
            <ThemePreview>
              <ThemePreviewColor $color="#10b981" />
              <ThemePreviewColor $color="#059669" />
              <ThemePreviewColor $color="#064e3b" />
            </ThemePreview>
            <ThemeOptionName>Green</ThemeOptionName>
          </ThemeOption>
        </ThemeOptions>
      </SettingsSection>

      <SettingsSection>
        <SettingsSectionTitle>
          <FiDatabase />
          Data Management
        </SettingsSectionTitle>
        <SettingsSectionDescription>
          Export your data as JSON or import from a previous backup
        </SettingsSectionDescription>
        <SettingsActions>
          <ButtonPrimary onClick={handleExport} disabled={tasks.length === 0}>
            <FiDownload size={16} />
            Export Data
          </ButtonPrimary>
          <FileInputLabel htmlFor="import-file-settings">
            <FiUpload size={16} />
            Import Data
          </FileInputLabel>
          <FileInputHidden
            id="import-file-settings"
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleImportChange}
          />
        </SettingsActions>
      </SettingsSection>

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
    </SettingsPage>
  );
};
