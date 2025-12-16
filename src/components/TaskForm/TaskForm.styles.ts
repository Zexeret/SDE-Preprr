import styled from "@emotion/styled";
import { ButtonSecondary } from "../../sharedStyles";

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const TaskFormHeading = styled.h2`
  && {
    top: 0;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
        display: flex;
    justify-content: space-between;
  }
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
  background: ${(props) => props.theme.primary};
  color: white;
  transition: all 0.2s;
  border: 1px solid;
  cursor: pointer;

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    margin-left: 0.25rem;

    &:hover {
      opacity: 0.7;
    }
  }

  ${({ selected, isCustom, theme }) => {
    if (selected) {
      return `
        background: ${theme.primary};
        color: white;
        border-color: ${theme.primary};
        box-shadow: 0 4px 12px ${theme.primary}40;
      `;
    } else if (isCustom) {
      return `
        background: ${theme.surfaceElevated};
        color: ${theme.text.primary};
        border-color: ${theme.border};
        &:hover {
          background: ${theme.primary};
          color: white;

          button {
            color: white;
          }
        }
      `;
    } else {
      return `
        background: ${theme.background};
        color: ${theme.text.secondary};
        border-color: ${theme.border};
        &:hover {
          background: ${theme.surfaceElevated};
          border-color: ${theme.primary};
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

export const FormContainer = styled.div`
  overflow-y: scroll;
  scrollbar-width: none;
`;

export const FooterActionContainer = styled.div`
  height: fit-content;
  margin-top: 2%;
`;

export const StyledCloseButton = styled(ButtonSecondary)`
  background: none;
  border: none;

  &&:hover {
  background: ${props => props.theme.surfaceElevated}
  }
`
