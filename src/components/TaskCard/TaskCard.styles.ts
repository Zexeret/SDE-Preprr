import styled from "@emotion/styled";
import type { DifficultyTagId } from "../../model";

export const TaskCardBase = styled.div`
  background: ${({ theme }) => theme.surface};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0px 5px ${({ theme }) => `${theme.primary}30`};
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
`;

export const TaskLinkContainer = styled.div`
  display: flex;
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
  color: ${({ theme }) => theme.text.primary}e3;
  text-decoration: ${(props) => (props.$isDone ? "line-through" : "none")};
  font-weight: 500;
  font-size: 0.9rem;
  word-break: break-all;
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  background: ${({ theme }) => theme.background};
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
    props.isDone ? props.theme.success : props.theme.background};
  color: ${(props) =>
    props.isDone ? 'white' : props.theme.text.secondary};

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${props => props.theme.text.primary};
  }
`;

export const IconButtonDanger = styled(IconButton)`
  &:hover {
    background: ${({ theme }) => theme.error};
    color: white;
  }
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  color: ${({ theme }) => theme.text.secondary};
  padding: 0.5rem;
  margin-right: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
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
  margin-top: 0.75rem;
`;

export const SeparatingDot = styled.div`
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.text.secondary};
  border-radius: 50%;
`;

export const Tag = styled.span<{ readonly $isCustom?: boolean }>`
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) =>
    props.$isCustom ? props.theme.primary + "ab" : props.theme.text.secondary};
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
    const tagMap: Record<DifficultyTagId, string> = {
      EASY: theme.success,
      MEDIUM: theme.warning,
      HARD: theme.error,
    };

    const tagColor = tagMap[difficulty];

    return `  
    padding: 0.5rem;
    border-radius: 0.375rem;
    margin-right: 1.25rem;
    border:1px solid ${tagColor};
    color: ${tagColor};
    background: ${tagColor}14;
  `;
  }}
`;
