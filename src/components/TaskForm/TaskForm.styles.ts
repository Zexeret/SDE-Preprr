import { css } from "@emotion/css";

export const formGroupStyles = css`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #f1f5f9;
  }

  input,
  textarea {
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

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const tagsContainerStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const tagButtonStyles = css`
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;

  &:hover {
    background: #334155;
    border-color: #6366f1;
  }
`;

export const tagButtonSelectedStyles = css`
  ${tagButtonStyles}
  background: #6366f1;
  color: white;
  border-color: #6366f1;
`;

export const tagButtonCustomStyles = css`
  ${tagButtonStyles}
  color: #8b5cf6;
  border-color: #8b5cf6;

  &:hover {
    background: #8b5cf6;
    color: white;
  }
`;

export const tagWithDeleteStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: #6366f1;
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

export const tagWithDeleteCustomStyles = css`
  ${tagWithDeleteStyles}
  background: #8b5cf6;

  button {
    margin-left: 0.5rem;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;

export const customTagInputContainerStyles = css`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
  }
`;

export const selectedTagsSectionStyles = css`
  margin-top: 1rem;
`;

export const selectedTagsLabelStyles = css`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #94a3b8;
`;

export const modalActionsStyles = css`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

export const customTagsHeaderStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const customTagsLabelContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const customTagsInfoStyles = css`
  font-size: 0.75rem;
  color: #64748b;
  font-style: italic;
`;
