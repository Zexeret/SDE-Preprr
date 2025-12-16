import styled from "@emotion/styled";

export const CardGlass = styled.div`
  background: ${({ theme }) => theme.surface};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px ${({ theme }) => theme.shadow};
`;

export const Select = styled.select`
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surfaceElevated};
  color: ${({ theme }) => theme.text.primary};
  font-family: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}20`};
  }

  option {
    background: ${({ theme }) => theme.surfaceElevated};
  }
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.overlay};
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 1rem;
  padding: 2rem;
  max-width: 65vw;
  width: 100%;
  height: fit-content;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px ${({ theme }) => theme.shadow};
  scrollbar-width: none;

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
  justify-content: center;
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
  background: ${({ theme }) => theme.primary};
  color: white;
  box-shadow: 0 0px 5px ${({ theme }) => `${theme.primary}40`};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 0px 10px ${({ theme }) => `${theme.primary}50`};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ButtonSecondary = styled(ButtonBase)`
  background: ${({ theme }) => theme.surfaceElevated};
  color: ${({ theme }) => theme.text.primary};
  border: 1px solid ${({ theme }) => theme.border};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.primaryHover};
  }
`;

export const ButtonDanger = styled(ButtonBase)`
  background: ${({ theme }) => theme.error};
  color: white;
  box-shadow: 0 4px 12px ${({ theme }) => `${theme.error}40`};

  &:hover:not(:disabled) {
    box-shadow: 0 6px 20px ${({ theme }) => `${theme.error}50`};
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
    color: ${({ theme }) => theme.text.primary};
    background: ${({ theme }) => theme.surfaceElevated};
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
    color: ${({ theme }) => theme.text.primary};
  }

  input,
  textarea,
  select {
    padding: 0.75rem;
    background: ${({ theme }) => theme.surfaceElevated};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.text.primary};
    font-size: 0.875rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}20`};
    }

    &::placeholder {
      color: ${({ theme }) => theme.text.secondary};
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;
