import { css } from "@emotion/css";

export const groupSelectorContainerStyles = css`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
`;

export const groupButtonStyles = css`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid #334155;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  background: #1e293b;
  color: #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #334155;
    border-color: #6366f1;
    color: #6366f1;
  }
`;

export const groupButtonActiveStyles = css`
  ${groupButtonStyles}
  background: #6366f1;
  color: white;
  border-color: #6366f1;

  &:hover {
    background: #4f46e5;
    color: white;
  }
`;

export const groupHeaderContainerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const groupTitleStyles = css`
  margin: 0;
  font-size: 1.25rem;
`;

export const groupCountStyles = css`
  font-size: 0.75rem;
  opacity: 0.8;
  margin-left: 0.25rem;
`;
