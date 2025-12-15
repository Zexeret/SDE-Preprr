import styled from "@emotion/styled";
import type { Theme } from "../../theme/Theme";

export const TaskCardBase = styled.div`
  background: ${({ theme }) => theme.rgba.white005};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.rgba.white02};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 12px ${({ theme }) => theme.rgba.primary03};
  }
`;

export const TaskCardDone = styled(TaskCardBase)`
  opacity: 0.7;
`;

export const TaskCardDragging = styled(TaskCardBase)`
  box-shadow: 0 8px 24px ${({ theme }) => theme.rgba.primary03};
  transform: rotate(2deg);
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const TaskContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TaskLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const TaskLink = styled.a<{ readonly $isDone?: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: ${(props) => (props.$isDone ? "line-through" : "none")};
  font-weight: 500;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

export const TaskLinkSpan = styled.span<{ readonly $isDone?: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: ${(props) => (props.$isDone ? "line-through" : "none")};
  font-weight: 500;
  word-break: break-all;
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const IconButton = styled.button<{ readonly theme: Theme }>`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.text.secondary ?? "#94a3b8"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

export const IconButtonSuccess = styled(IconButton)`
  &:hover {
    background: ${({ theme }) => theme.actions.success};
    color: white;
  }
`;

export const IconButtonDanger = styled(IconButton)`
  &:hover {
    background: ${({ theme }) => theme.actions.error};
    color: white;
  }
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  color: ${({ theme }) => theme.text.muted};
  padding: 0.5rem;
  margin-right: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    cursor: grabbing;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const Tag = styled.span<{ readonly $isCustom?: boolean }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.surface};
  color: ${(props) =>
    props.$isCustom
      ? props.theme.colors.secondary
      : props.theme.text.secondary};
  border: 1px solid
    ${(props) =>
      props.$isCustom
        ? props.theme.colors.secondary
        : props.theme.secondaryBorder};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.text.secondary};

  svg {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.text.primary};
  }

  p {
    margin: 0;
  }
`;

export const TaskListControls = styled.div`
  margin-bottom: 1rem;
`;

export const TasksGrid = styled.div`
  display: grid;
  gap: 1rem;
`;
