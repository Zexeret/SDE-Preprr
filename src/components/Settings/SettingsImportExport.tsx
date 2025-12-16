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
import { useTaskUtility } from "../../context";
import { ButtonPrimary } from "../../sharedStyles";

export const SettingsImportExport = memo(() => {
  const {
    tasks,
    handleExport,
    handleImport,
  } = useTaskUtility();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportData = useCallback(() => {
    handleExport();
  }, [handleExport]);

  const handleImportChange = useCallback(
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
        <ButtonPrimary onClick={handleExportData} disabled={tasks.length === 0}>
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
