import { memo } from "react";
import {
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionTitle,
  ThemeOption,
  ThemeOptionName,
  ThemeOptions,
  ThemePreview,
  ThemePreviewColor,
} from "./Settings.styles";
import { FiDroplet } from "react-icons/fi";

export const SettingsTheme = memo(() => {
  return (
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
  );
});
