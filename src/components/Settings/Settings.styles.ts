import styled from "@emotion/styled";

export const SettingsPage = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SettingsHeader = styled.header`
  margin-bottom: 3rem;
`;

export const SettingsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const SettingsSubtitle = styled.p`
  color: #94a3b8;
  font-size: 1rem;
`;

export const SettingsSection = styled.section`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

export const SettingsSectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: #6366f1;
  }
`;

export const SettingsSectionDescription = styled.p`
  color: #94a3b8;
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

export const ThemeOption = styled.button<{ readonly $active: boolean }>`
  background: ${(props) =>
    props.$active ? "rgba(99, 102, 241, 0.1)" : "rgba(255, 255, 255, 0.03)"};
  border: 2px solid
    ${(props) => (props.$active ? "#6366f1" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.05);
  }
`;

export const ThemeOptionName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #cbd5e1;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
