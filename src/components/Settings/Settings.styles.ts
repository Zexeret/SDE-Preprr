import { css } from "@emotion/css";

export const settingsPageStyles = css`
  max-width: 900px;
`;

export const settingsHeaderStyles = css`
  margin-bottom: 2rem;
`;

export const settingsTitleStyles = css`
  font-size: 2rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 0.5rem;
`;

export const settingsSubtitleStyles = css`
  color: #94a3b8;
  margin: 0;
`;

export const settingsSectionStyles = css`
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  margin-bottom: 1.5rem;
`;

export const settingsSectionTitleStyles = css`
  font-size: 1.125rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const settingsSectionDescriptionStyles = css`
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

export const settingsActionsStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const themeOptionsStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

export const themeOptionStyles = css`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.5);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }
`;

export const themeOptionActiveStyles = css`
  ${themeOptionStyles}
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
`;

export const themeOptionNameStyles = css`
  font-weight: 600;
  color: #f1f5f9;
  margin-top: 0.5rem;
`;

export const themePreviewStyles = css`
  width: 100%;
  height: 60px;
  border-radius: 0.375rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

export const themePreviewColorStyles = css`
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;

export const statsGridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const statCardSettingsStyles = css`
  background: rgba(15, 23, 42, 0.5);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
`;

export const statLabelSettingsStyles = css`
  color: #64748b;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

export const statValueSettingsStyles = css`
  font-size: 1.75rem;
  font-weight: 700;
  color: #f1f5f9;
`;
