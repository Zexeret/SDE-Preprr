import styled from "@emotion/styled";
import { Theme } from "./theme";

// Layout Components
export const AppContainer = styled.div<{ theme: Theme }>`
  display: flex;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
`;

export const PageHeader = styled.header`
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1<{ theme: Theme }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const PageSubtitle = styled.p<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

export const PageActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Card Components
export const Card = styled.div<{ theme: Theme }>`
  background: ${(props) => props.theme.colors.cardBackground};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: ${(props) => props.theme.shadows.card};
`;

export const CardGlass = styled(Card)<{ theme: Theme }>`
  background: ${(props) => props.theme.colors.cardBackgroundGlass};
`;

// Button Components
export const Button = styled.button<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)<{ theme: Theme }>`
  background: ${(props) => props.theme.colors.primary};
  color: white;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${(props) => props.theme.shadows.button};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(Button)<{ theme: Theme }>`
  background: transparent;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.cardBackground};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const DangerButton = styled(Button)<{ theme: Theme }>`
  background: ${(props) => props.theme.colors.danger};
  color: white;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.dangerHover};
    transform: translateY(-1px);
    box-shadow: ${(props) => props.theme.shadows.button};
  }
`;

export const IconButton = styled.button<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  background: transparent;
  color: ${(props) => props.theme.colors.textSecondary};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.cardBackground};
    color: ${(props) => props.theme.colors.text};
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Modal Components
export const ModalOverlay = styled.div<{ theme: Theme }>`
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
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div<{ theme: Theme }>`
  background: ${(props) => props.theme.colors.cardBackground};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${(props) => props.theme.shadows.modal};

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.colors.text};
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

// Form Components
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${(props: { theme: Theme }) => props.theme.colors.text};
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border-radius: 8px;
    border: 1px solid ${(props: { theme: Theme }) => props.theme.colors.border};
    background: ${(props: { theme: Theme }) =>
      props.theme.colors.inputBackground};
    color: ${(props: { theme: Theme }) => props.theme.colors.text};
    font-size: 0.875rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${(props: { theme: Theme }) => props.theme.colors.primary};
      box-shadow: 0 0 0 3px
        ${(props: { theme: Theme }) => props.theme.colors.primary}33;
    }

    &::placeholder {
      color: ${(props: { theme: Theme }) => props.theme.colors.textSecondary};
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

// Input Components
export const Input = styled.input<{ theme: Theme }>`
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}33;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export const TextArea = styled.textarea<{ theme: Theme }>`
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.875rem;
  transition: all 0.2s ease;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}33;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

// File Input Components
export const FileInputHidden = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  background: transparent;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};

  &:hover {
    background: ${(props) => props.theme.colors.cardBackground};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

// Badge Components
export const Badge = styled.span<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => props.theme.colors.cardBackground};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};
`;

export const TagBadge = styled(Badge)<{ color?: string }>`
  background: ${(props) => props.color || props.theme.colors.primary}22;
  color: ${(props) => props.color || props.theme.colors.primary};
  border-color: ${(props) => props.color || props.theme.colors.primary}44;
`;

// Utility Components
export const Divider = styled.div<{ theme: Theme }>`
  height: 1px;
  background: ${(props) => props.theme.colors.border};
  margin: 1rem 0;
`;

export const EmptyState = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};

  svg {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }
`;
