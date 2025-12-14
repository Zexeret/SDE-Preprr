import { css } from "@emotion/css";

const colors = {
  primary: "#6366f1",
  primaryHover: "#4f46e5",
  secondary: "#8b5cf6",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
  background: "#0f172a",
  surface: "#1e293b",
  surfaceHover: "#334155",
  border: "#334155",
  text: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
};

export const cardStyles = css`
  background: ${colors.surface};
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid ${colors.border};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const cardGlassStyles = css`
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

export const buttonBaseStyles = css`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  font-family: inherit;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      transform: none;
    }
  }
`;

export const buttonPrimaryStyles = css`
  ${buttonBaseStyles}
  background: ${colors.primary};
  color: white;

  &:hover:not(:disabled) {
    background: ${colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }
`;

export const buttonSecondaryStyles = css`
  ${buttonBaseStyles}
  background: ${colors.surface};
  color: ${colors.text};
  border: 1px solid ${colors.border};

  &:hover:not(:disabled) {
    background: ${colors.surfaceHover};
  }
`;

export const buttonDangerStyles = css`
  ${buttonBaseStyles}
  background: ${colors.danger};
  color: white;

  &:hover:not(:disabled) {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

export const buttonSuccessStyles = css`
  ${buttonBaseStyles}
  background: ${colors.success};
  color: white;

  &:hover:not(:disabled) {
    background: #059669;
    transform: translateY(-1px);
  }
`;

export const modalOverlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

export const modalContentStyles = css`
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: ${colors.text};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const fileInputHiddenStyles = css`
  display: none;
`;

export const fileInputLabelStyles = css`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  background: ${colors.surface};
  color: ${colors.text};
  border: 1px solid ${colors.border};

  &:hover {
    background: ${colors.surfaceHover};
  }
`;
