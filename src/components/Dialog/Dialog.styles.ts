import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonDanger,
  ModalOverlay,
} from "../../sharedStyles";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Extend shared ModalOverlay with fade animation
export const Overlay = styled(ModalOverlay)`
  animation: ${fadeIn} 0.15s ease-out;
`;

export const DialogContainer = styled.div`
  background-color: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadowHover};
  min-width: 320px;
  max-width: 480px;
  width: 90%;
  animation: ${slideIn} 0.2s ease-out;
`;

export const DialogHeader = styled.div`
  padding: 1.25rem 1.5rem 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const DialogTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

export const DialogBody = styled.div`
  padding: 1rem 1.5rem;
`;

export const DialogMessage = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.text.secondary};
  white-space: pre-wrap;
`;

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem 1.25rem;
`;

export const CancelButton = styled(ButtonSecondary)`
  padding: 0.6rem 1.25rem;
`;

export const ConfirmButton = styled(ButtonPrimary)`
  padding: 0.6rem 1.25rem;
`;

export const DangerButton = styled(ButtonDanger)`
  padding: 0.6rem 1.25rem;
`;

export const IconContainer = styled.div<{ readonly type?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 0.75rem;
  background-color: ${({ theme, type }) => {
    switch (type) {
      case "error":
        return theme.errorBackground;
      case "warning":
        return theme.warningBackground;
      case "success":
        return theme.successBackground;
      default:
        return theme.surfaceHover;
    }
  }};
  color: ${({ theme, type }) => {
    switch (type) {
      case "error":
        return theme.error;
      case "warning":
        return theme.warning;
      case "success":
        return theme.success;
      default:
        return theme.primary;
    }
  }};
`;
