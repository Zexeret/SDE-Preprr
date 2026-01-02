import styled from "@emotion/styled";

export const SyncSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ConnectedFileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const FileNameDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.text.primary};
  font-weight: 500;

  svg {
    color: ${({ theme }) => theme.primary};
    flex-shrink: 0;
  }

  span {
    word-break: break-all;
  }
`;

export const StatusBadge = styled.span<{ readonly $hasPermission: boolean }>`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $hasPermission }) =>
    $hasPermission ? theme.successBackground : theme.warningBackground};
  color: ${({ theme, $hasPermission }) =>
    $hasPermission ? theme.success : theme.warning};
`;

export const LastSavedText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.muted};
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CheckboxInput = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.primary};
`;

export const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  user-select: none;
`;

export const UnsupportedBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.warningBackground};
  border: 1px solid ${({ theme }) => theme.warning};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.warning};

  svg {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    strong {
      font-weight: 600;
      color: ${({ theme }) => theme.text.primary};
    }

    p {
      margin: 0;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.text.secondary};
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const SpinnerIcon = styled.div`
  color: ${({ theme }) => theme.primary};
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
`;
