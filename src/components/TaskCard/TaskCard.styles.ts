import styled from "@emotion/styled";
import { DifficultyTagId } from "../../model";

export const TaskCardBase = styled.div<{ readonly $isCompleted?: boolean }>`
  background: ${({ theme }) => theme.surface};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.45rem;
  transition: all 0.2s ease;
  position: relative;
  opacity: ${({ $isCompleted }) => ($isCompleted ? 0.5 : 1)};

  &:hover {
    z-index: 1;
    background: ${({ theme }) => theme.surfaceHover};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const TaskContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TaskLinkContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const TaskLink = styled.a<{ readonly $isDone?: boolean }>`
  color: ${({ theme }) => theme.text.secondary};
  font-weight: 500;
  word-break: break-all;
  display: flex;
  cursor: pointer;
  margin-left: 1%;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.primaryHover};
  }
`;

export const TaskLinkSpan = styled.span<{ readonly $isDone?: boolean }>`
  color: ${({ theme, $isDone }) =>
    $isDone ? theme.success : theme.text.primary};
  text-decoration: ${(props) => (props.$isDone ? "line-through" : "none")};
  font-weight: 500;
  font-size: 0.8rem;
  word-break: break-all;
  transition: color 0.2s ease;
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

export const IconButtonSuccess = styled(IconButton)<{
  readonly isDone: boolean;
}>`
  background: ${(props) =>
    props.isDone ? props.theme.successBackground : "transparent"};
  color: ${(props) =>
    props.isDone ? props.theme.success : props.theme.text.secondary};

  &:hover {
    background: ${({ theme }) => theme.successBackground};
    color: ${({ theme }) => theme.success};
  }
`;

export const IconButtonDanger = styled(IconButton)`
  &:hover {
    background: ${({ theme }) => theme.errorBackground};
    color: ${({ theme }) => theme.error};
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
    color: ${({ theme }) => theme.text.primary};
  }

  &:active {
    cursor: grabbing;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SeparatingDot = styled.div`
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.text.muted};
  border-radius: 50%;
  opacity: 0.5;
`;

export const Tag = styled.span<{ readonly $isCustom?: boolean }>`
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${(props) =>
    props.$isCustom ? props.theme.primary : props.theme.text.secondary};
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

export const DifficultyTag = styled.button<{
  readonly difficulty: DifficultyTagId;
}>`
  ${({ theme, difficulty }) => {
    let tagColor = theme.warning;

    if (difficulty === DifficultyTagId.EASY) {
      tagColor = theme.success;
    } else if (difficulty === DifficultyTagId.HARD) {
      tagColor = theme.error;
    }

    return `  
    font-size: 0.7rem;
    width: 65px;
    padding: 0.4rem 0.5rem;
    border-radius: ${theme.radius.sm};
    margin: 0 1.25rem;
    border: 1px solid ${tagColor};
    color: ${tagColor};
    background: ${tagColor}14;
    cursor: pointer;
    transition: all 0.15s ease;
    
    &:hover {
      background: ${tagColor}22;
    }
  `;
  }}
`;
