import { css } from "@emotion/css";

export const statsBarStyles = css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const statCardStyles = css`
  flex: 1;
  min-width: 150px;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
`;

export const statLabelStyles = css`
  color: #94a3b8;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

export const statValueStyles = css`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f1f5f9;
`;

export const statValueSuccessStyles = css`
  ${statValueStyles}
  color: #10b981;
`;

export const statValueWarningStyles = css`
  ${statValueStyles}
  color: #f59e0b;
`;
