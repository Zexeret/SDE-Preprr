import React, { memo, useCallback, useRef } from "react";
import {
  FileInputHidden,
  importButtonStyles,
  SettingsActions,
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionTitle,
} from "./Settings.styles";
import { FiDatabase, FiDownload, FiUpload } from "react-icons/fi";
import { ButtonPrimary, ButtonSecondary } from "../../sharedStyles";
import { useSelector } from "react-redux";
import { selectTasksCount } from "../../store";
import { useImportData } from "./useImportData";
import { useExportData } from "./useExportData";

export const SettingsImportExport = memo(() => {
  const tasksCount = useSelector(selectTasksCount);
  const handleImport = useImportData();
  const handleExport = useExportData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportData = useCallback(() => {
    handleExport();
  }, [handleExport]);

  const handleImportData = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      await handleImport(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleImport]
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
        <ButtonPrimary onClick={handleExportData} disabled={tasksCount === 0}>
          <FiDownload size={16} />
          Export Data
        </ButtonPrimary>
        <ButtonSecondary className={importButtonStyles}>
          <label htmlFor="import-file-settings">
            <FiUpload size={16} />
            Import Data
          </label>
          <FileInputHidden
            id="import-file-settings"
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleImportData}
          />
        </ButtonSecondary>
      </SettingsActions>
    </SettingsSection>
  );
});
