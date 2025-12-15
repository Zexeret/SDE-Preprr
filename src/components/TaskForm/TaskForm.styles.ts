import styled from "@emotion/styled";
import { colors } from "../../sharedStyles";

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const StyledTag = styled.span<{
  readonly selected?: boolean;
  readonly isCustom?: boolean;
}>`
 display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${colors.primary};
  color: white;
  transition: all 0.2s;
  border: 1px solid;

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

export const AddCustomTagContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;
