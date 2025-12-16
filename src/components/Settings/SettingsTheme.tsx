import { memo } from "react";
import {
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionTitle,
  ThemeOption,
  ThemeOptionName,
  ThemeOptions,
} from "./Settings.styles";
import { FiDroplet } from "react-icons/fi";
import { useTaskUtility } from "../../context";
import { ButtonPrimary } from "../../sharedStyles";
import type { ThemeName } from "../../model";

const themeOptions: ReadonlyArray<{ readonly value: ThemeName; readonly label: string }> = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
];

export const SettingsTheme = memo(() => {
  const { setTheme, themeName } = useTaskUtility();

  return (
    <SettingsSection>
      <SettingsSectionTitle>
        <FiDroplet />
        Theme
      </SettingsSectionTitle>
      <SettingsSectionDescription>
        Choose your preferred color theme
      </SettingsSectionDescription>
      <ThemeOptions>
        {themeOptions.map(({ value, label }) => {
          const isSelected = themeName === value;
          const ButtonComponent = isSelected ? ButtonPrimary : ThemeOption;
          
          return (
            <ButtonComponent key={value} onClick={() => setTheme(value)}>
              <ThemeOptionName>{label}</ThemeOptionName>
            </ButtonComponent>
          );
        })}
      </ThemeOptions>
    </SettingsSection>
  );
});
