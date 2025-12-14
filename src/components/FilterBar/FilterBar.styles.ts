import { css } from "@emotion/css";

export const filterBarContainerStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const selectStyles = css`
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #334155;
  background: #1e293b;
  color: #f1f5f9;
  font-family: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }

  option {
    background: #1e293b;
  }
`;
