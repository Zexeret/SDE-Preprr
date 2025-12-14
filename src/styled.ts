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

export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.background};
  color: ${colors.text};
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.header`
  max-width: 1400px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  h1 {
    font-size: 2rem;
    margin: 0;
    background: linear-gradient(
      135deg,
      ${colors.primary} 0%,
      ${colors.secondary} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger" | "success";
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

export const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
`;

export const Card = styled.div`
  background: ${colors.surface};
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid ${colors.border};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${colors.text};
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid ${colors.border};
    background: ${colors.background};
    color: ${colors.text};
    font-family: inherit;
    font-size: 0.875rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: ${colors.primary};
    }

    &::placeholder {
      color: ${colors.textMuted};
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Tag = styled.span<{ selected?: boolean; isCustom?: boolean }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${({ selected, isCustom }) => {
    if (selected) {
      return `
        background: ${colors.primary};
        color: white;
        border-color: ${colors.primary};
      `;
    } else if (isCustom) {
      return `
        background: ${colors.surface};
        color: ${colors.secondary};
        border-color: ${colors.secondary};
        &:hover {
          background: ${colors.secondary};
          color: white;
        }
      `;
    } else {
      return `
        background: ${colors.surface};
        color: ${colors.textSecondary};
        border-color: ${colors.border};
        &:hover {
          background: ${colors.surfaceHover};
          border-color: ${colors.primary};
        }
      `;
    }
  }}
`;

export const TagWithDelete = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${colors.primary};
  color: white;

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    margin-left: 0.25rem;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
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

export const ProblemCard = styled.div<{
  isDone?: boolean;
  isDragging?: boolean;
}>`
  background: ${colors.surface};
  border-radius: 0.75rem;
  padding: 1.25rem;
  border: 1px solid ${colors.border};
  transition: all 0.2s;
  opacity: ${({ isDone }) => (isDone ? 0.7 : 1)};
  ${({ isDragging }) =>
    isDragging &&
    `
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
    transform: rotate(2deg);
  `}

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  color: ${colors.textMuted};
  padding: 0.5rem;
  margin-right: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }

  &:active {
    cursor: grabbing;
  }
`;

export const ProblemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const ProblemLink = styled.a<{ isDone?: boolean }>`
  color: ${colors.primary};
  text-decoration: none;
  font-weight: 500;
  word-break: break-all;
  ${({ isDone }) => isDone && `text-decoration: line-through;`}

  &:hover {
    text-decoration: underline;
  }
`;

export const ProblemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const IconButton = styled.button<{
  variant?: "primary" | "danger" | "success";
}>`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  background: ${colors.surface};
  color: ${colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  ${({ variant }) => {
    switch (variant) {
      case "success":
        return `
          &:hover {
            background: ${colors.success};
            color: white;
          }
        `;
      case "danger":
        return `
          &:hover {
            background: ${colors.danger};
            color: white;
          }
        `;
      default:
        return `
          &:hover {
            background: ${colors.primary};
            color: white;
          }
        `;
    }
  }}
`;

export const NotesPreview = styled.div`
  color: ${colors.textSecondary};
  font-size: 0.875rem;
  margin-top: 0.75rem;
  line-height: 1.5;
  max-height: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Modal = styled.div`
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

export const ModalContent = styled.div`
  background: ${colors.surface};
  border-radius: 1rem;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid ${colors.border};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);

  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: ${colors.text};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${colors.textSecondary};

  svg {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: ${colors.text};
  }

  p {
    margin: 0;
  }
`;

export const StatsBar = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled.div`
  flex: 1;
  min-width: 150px;
  background: ${colors.background};
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${colors.border};

  .label {
    color: ${colors.textSecondary};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${colors.text};
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
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

export const GroupHeader = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${colors.border};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:first-of-type {
    margin-top: 0;
  }

  .count {
    font-size: 0.875rem;
    color: ${colors.textSecondary};
    font-weight: 400;
  }
`;

export const GroupSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.background};
`;

export const GroupButton = styled.button<{ active?: boolean }>`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ active }) => (active ? colors.primary : colors.border)};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  background: ${({ active }) => (active ? colors.primary : colors.surface)};
  color: ${({ active }) => (active ? "white" : colors.text)};

  &:hover {
    background: ${({ active }) =>
      active ? colors.primaryHover : colors.surfaceHover};
    border-color: ${colors.primary};
    ${({ active }) => !active && `color: ${colors.primary};`}
  }

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProblemsGrid = styled.div`
  display: grid;
  gap: 1rem;
`;
