import styled from "@emotion/styled";


export const ContentHeaderContainer = styled.header`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`;

export const ContentTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.primary}
`;

export const ContentSubtitle = styled.p`
  color: ${props => props.theme.text.secondary};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

export const ContentActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  height: auto;
    align-items: flex-start;
`;
