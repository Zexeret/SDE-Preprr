import styled from "@emotion/styled";

export const TaskListContainer = styled.div`
  /* Container for the entire task list */
`;

export const EmptyListContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #94a3b8;

  svg {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #f1f5f9;
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

export const GroupHeader = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #334155;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const GroupCount = styled.span`
  font-size: 0.875rem;
  color: #94a3b8;
  font-weight: 400;
`;
