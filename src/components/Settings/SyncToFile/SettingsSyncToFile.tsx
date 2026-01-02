import { memo } from "react";
import { FiFile, FiLoader } from "react-icons/fi";
import {
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionTitle,
} from "../Settings.styles";
import { useSyncToFile } from "./useSyncToFile";
import { SyncToFileUnsupported } from "./SyncToFileUnsupported";
import { SyncToFileDisconnected } from "./SyncToFileDisconnected";
import { SyncToFileConnected } from "./SyncToFileConnected";
import {
  LoadingContainer,
  LoadingText,
  SpinnerIcon,
} from "./SyncToFile.styles";

export const SettingsSyncToFile = memo(() => {
  const {
    isSupported,
    autoSaveEnabled,
    saveFrequency,
    periodicIntervalMinutes,
    fileName,
    hasPermission,
    isConnected,
    isSaving,
    isLoading,
    lastSavedDisplay,
    handleOpenFile,
    handleCreateFile,
    handleDisconnect,
    handleRequestPermission,
    handleSaveNow,
    handleAutoSaveToggle,
    handleSaveFrequencyChange,
    handlePeriodicIntervalChange,
  } = useSyncToFile();

  // Render unsupported browser warning
  if (!isSupported) {
    return <SyncToFileUnsupported />;
  }

  // Render loading state
  if (isLoading) {
    return (
      <SettingsSection>
        <SettingsSectionTitle>
          <FiFile />
          Sync to Local File
        </SettingsSectionTitle>
        <SettingsSectionDescription>
          Automatically save your data to a local file for backup
        </SettingsSectionDescription>
        <LoadingContainer>
          <SpinnerIcon>
            <FiLoader size={24} />
          </SpinnerIcon>
          <LoadingText>Loading data from file...</LoadingText>
        </LoadingContainer>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection>
      <SettingsSectionTitle>
        <FiFile />
        Sync to Local File
      </SettingsSectionTitle>
      <SettingsSectionDescription>
        Automatically save your data to a local file for backup
      </SettingsSectionDescription>

      {!isConnected ? (
        <SyncToFileDisconnected
          onOpenFile={handleOpenFile}
          onCreateFile={handleCreateFile}
        />
      ) : (
        <SyncToFileConnected
          fileName={fileName}
          hasPermission={hasPermission}
          lastSavedDisplay={lastSavedDisplay}
          autoSaveEnabled={autoSaveEnabled}
          saveFrequency={saveFrequency}
          periodicIntervalMinutes={periodicIntervalMinutes}
          isSaving={isSaving}
          onRequestPermission={handleRequestPermission}
          onAutoSaveToggle={handleAutoSaveToggle}
          onSaveFrequencyChange={handleSaveFrequencyChange}
          onPeriodicIntervalChange={handlePeriodicIntervalChange}
          onSaveNow={handleSaveNow}
          onDisconnect={handleDisconnect}
        />
      )}
    </SettingsSection>
  );
});
