import { memo } from "react";
import { FiFile, FiAlertTriangle } from "react-icons/fi";
import { SettingsSection, SettingsSectionTitle } from "../Settings.styles";
import { UnsupportedBanner } from "./SyncToFile.styles";

export const SyncToFileUnsupported = memo(() => {
  return (
    <SettingsSection>
      <SettingsSectionTitle>
        <FiFile />
        Sync to Local File
      </SettingsSectionTitle>
      <UnsupportedBanner>
        <FiAlertTriangle size={20} />
        <div>
          <strong>Browser Not Supported</strong>
          <p>
            The File System Access API is not supported in your browser. Please
            use Chrome, Edge, or another Chromium-based browser to use this
            feature.
          </p>
        </div>
      </UnsupportedBanner>
    </SettingsSection>
  );
});
