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
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

export const Select = styled.select`
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.border};
  background: ${colors.surface};
  color: ${colors.text};
  font-family: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  option {
    background: ${colors.surface};
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

  ${({ variant = "primary" }) => {
    switch (variant) {
      case "primary":
        return `
          background: ${colors.primary};
          color: white;
          &:hover {
            background: ${colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
          }
        `;
      case "secondary":
        return `
          background: ${colors.surface};
          color: ${colors.text};
          border: 1px solid ${colors.border};
          &:hover {
            background: ${colors.surfaceHover};
          }
        `;
      case "danger":
        return `
          background: ${colors.danger};
          color: white;
          &:hover {
            background: #dc2626;
            transform: translateY(-1px);
          }
        `;
      case "success":
        return `
          background: ${colors.success};
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
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 42rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #f1f5f9;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

// Styled Components
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
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ButtonSecondary = styled(ButtonBase)`
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ButtonDanger = styled(ButtonBase)`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
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
  color: #94a3b8;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.05);
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
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: #e2e8f0;
    font-size: 0.875rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #6366f1;
      background: rgba(255, 255, 255, 0.08);
    }

    &::placeholder {
      color: #64748b;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;
