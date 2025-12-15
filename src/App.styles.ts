import { css } from "@emotion/css";

export const appContainerStyles = css`
  min-height: 100vh;
  width: 100vw;
  display: flex;
`;

export const mainContentWithSidebarStyles = css`
  margin-left: 280px;
  padding: 2rem;
  min-height: 100vh;
  flex: 1;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

export const pageHeaderStyles = css`
  margin-bottom: 2rem;
`;

export const pageTitleStyles = css`
  font-size: 2rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 0.5rem;
`;

export const pageSubtitleStyles = css`
  color: #94a3b8;
  margin: 0;
`;

export const pageActionsStyles = css`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

export const contentSectionStyles = css`
  display: grid;
  gap: 2rem;
`;

export const headerStyles = css`
  max-width: 1400px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const titleStyles = css`
  font-size: 2rem;
  margin: 0;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const headerActionsStyles = css`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const mainContentStyles = css`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
`;

export const formGroupStyles = css`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #f1f5f9;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #334155;
    background: #0f172a;
    color: #f1f5f9;
    font-family: inherit;
    font-size: 0.875rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #6366f1;
    }

    &::placeholder {
      color: #64748b;
    }
  }
`;

export const modalActionsStyles = css`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;
