import { memo, useCallback } from "react";
import {
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionTitle,
  ThemeOptionName,
  ThemeOptions,
} from "./Settings.styles";
import { FiDroplet } from "react-icons/fi";
import { ButtonPrimary, ButtonSecondary } from "../../sharedStyles";
import type { ThemeName } from "../../model";
import { useSelector } from "react-redux";
import { selectThemename, setThemeName, useAppDispatch } from "../../store";

const themeOptions: ReadonlyArray<{
  readonly value: ThemeName;
  readonly label: string;
}> = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
];

export const SettingsTheme = memo(() => {
  const themeName = useSelector(selectThemename);
  const dispatch = useAppDispatch();

  const handleThemeClick = useCallback(
    (value: ThemeName) => {
      dispatch(setThemeName(value));
    },
    [dispatch]
  );

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
          const ButtonComponent = isSelected ? ButtonPrimary : ButtonSecondary;

          return (
            <ButtonComponent
              key={value}
              onClick={() => handleThemeClick(value)}
            >
              <ThemeOptionName>{label}</ThemeOptionName>
            </ButtonComponent>
          );
        })}
      </ThemeOptions>
    </SettingsSection>
  );
});
