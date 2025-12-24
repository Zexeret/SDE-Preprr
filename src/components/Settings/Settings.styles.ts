import { css } from "@emotion/css";
import styled from "@emotion/styled";

export const SettingsPage = styled.div`
  padding: 2rem;
  margin: 0 auto;
  scrollbar-width: none;
`;

export const SettingsHeader = styled.header`
  margin-bottom: 3rem;
`;

export const SettingsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.text.primary};
`;

export const SettingsSubtitle = styled.p`
  color: ${(props) => props.theme.text.secondary};
  font-size: 1rem;
`;

export const SettingsSection = styled.section`
  background: ${(props) => props.theme.surface};
  backdrop-filter: blur(10px);
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 0px 8px ${(props) => props.theme.border};
`;

export const SettingsSectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.text.primary};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${(props) => props.theme.primary};
  }
`;

export const SettingsSectionDescription = styled.p`
  color: ${(props) => props.theme.text.secondary};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

export const SettingsActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ThemeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

export const ThemeOptionName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const ThemePreview = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ThemePreviewColor = styled.span<{ readonly $color: string }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  background: ${(props) => props.$color};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

export const StatCardSettings = styled.div`
  background: ${(props) => props.theme.surfaceElevated};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
`;

export const StatLabelSettings = styled.div`
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
`;

export const StatValueSettings = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.text.primary};
`;

export const importButtonStyles = css`
  & > label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const FileInputHidden = styled.input`
  display: none;
`;
