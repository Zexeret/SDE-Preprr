import React, { memo, useCallback, useRef } from "react";
import {
  FileInputHidden,
  FileInputLabel,
  SettingsActions,
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionTitle,
} from "./Settings.styles";
import { FiDatabase, FiDownload, FiUpload } from "react-icons/fi";
import { exportData, importData } from "../../utils";
import { useTaskUtility } from "../../context";
import { ButtonPrimary } from "../../sharedStyles";

export const SettingsImportExport = memo(() => {
  const {
    tasks,
    customGroups,
    customTags,
    setTasks,
    setCustomGroups,
    setCustomTags,
  } = useTaskUtility();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = useCallback(() => {
    exportData(tasks, customTags, customGroups);
  }, [customGroups, customTags, tasks]);

  const handleImportChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setTasks(data.tasks);
          setCustomTags(data.customTags || []);
          setCustomGroups(data.customGroups || []);
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to import data");
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [setCustomGroups, setCustomTags, setTasks]
  );
  
  return (
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
  );
});
