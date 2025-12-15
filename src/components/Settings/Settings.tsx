import { memo } from "react";
import {
  SettingsPage,
  SettingsHeader,
  SettingsTitle,
  SettingsSubtitle,
} from "./Settings.styles";
import { SettingsOverview } from "./SettingsOverview";
import { SettingsTheme } from "./SettingsTheme";
import { SettingsImportExport } from "./SettingsImportExport";
import { SettingsResetProgress } from "./SettingsResetProgress";

export const Settings = memo(() => {
  return (
    <SettingsPage>
      <SettingsHeader>
        <SettingsTitle>Settings</SettingsTitle>
        <SettingsSubtitle>Manage your preferences and data</SettingsSubtitle>
      </SettingsHeader>

      <SettingsOverview />

      <SettingsTheme />

      <SettingsImportExport />

      <SettingsResetProgress />
    </SettingsPage>
  );
});
