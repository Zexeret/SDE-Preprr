import styled from "@emotion/styled";

export const colors = {
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

export const CardGlass = styled.div`
  background: ${({ theme }) => theme.rgba.white003};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.rgba.white01};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const Select = styled.select`
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.secondaryBorder};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.text.primary};
  font-family: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  option {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const Button = styled.button<{
  readonly variant?: "primary" | "secondary" | "danger" | "success";
}>`
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

  ${({ variant = "primary", theme }) => {
    switch (variant) {
      case "primary":
        return `
          background: ${theme.colors.primary};
          color: white;
          &:hover {
            background: ${theme.colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px ${
              theme.rgba.primary04 ?? "rgba(99, 102, 241, 0.4)"
            };
          }
        `;
      case "secondary":
        return `
          background: ${theme.colors.surface};
          color: ${theme.text.primary};
          border: 1px solid ${theme.secondaryBorder};
          &:hover {
            background: ${theme.colors.surfaceHover};
          }
        `;
      case "danger":
        return `
          background: ${theme.actions.error};
          color: white;
          &:hover {
            background: #dc2626;
            transform: translateY(-1px);
          }
        `;
      case "success":
        return `
          background: ${theme.actions.success};
          color: white;
          &:hover {
            background: #059669;
            transform: translateY(-1px);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.rgba.black07};
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.background} 100%
  );
  border: 1px solid ${({ theme }) => theme.rgba.white01};
  border-radius: 1rem;
  padding: 2rem;
  max-width: 42rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.modal};

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

export const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonPrimary = styled(ButtonBase)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  color: white;
  box-shadow: ${({ theme }) => theme.shadows.buttonPrimary};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.buttonPrimaryHover};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ButtonSecondary = styled(ButtonBase)`
  background: ${({ theme }) => theme.rgba.white005};
  color: #e2e8f0;
  border: 1px solid ${({ theme }) => theme.rgba.white01};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.rgba.white01};
    border-color: ${({ theme }) => theme.rgba.white02};
  }
`;

export const ButtonDanger = styled(ButtonBase)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.actions.error} 0%,
    #dc2626 100%
  );
  color: white;
  box-shadow: ${({ theme }) => theme.shadows.buttonDanger};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.buttonDangerHover};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ButtonIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    color: #e2e8f0;
    background: ${({ theme }) => theme.rgba.white005};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #cbd5e1;
  }

  input,
  textarea,
  select {
    padding: 0.75rem;
    background: ${({ theme }) => theme.rgba.white005};
    border: 1px solid ${({ theme }) => theme.rgba.white01};
    border-radius: 0.5rem;
    color: #e2e8f0;
    font-size: 0.875rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.rgba.white008};
    }

    &::placeholder {
      color: ${({ theme }) => theme.text.muted};
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;
