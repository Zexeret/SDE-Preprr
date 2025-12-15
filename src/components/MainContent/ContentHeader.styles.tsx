import styled from "@emotion/styled";


export const ContentHeaderContainer = styled.header`
  margin-bottom: 2rem;
`;

export const ContentTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ContentSubtitle = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

export const ContentActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;
