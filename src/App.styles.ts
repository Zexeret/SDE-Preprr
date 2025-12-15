import styled from "@emotion/styled";

export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  scrollbar-width: none;
`;

export const SideBarContainer = styled.div`
  height: 100%;
  display: block;
  position: static;
  flex-grow: 0.05;
  border: 1px solid ${({ theme }) => theme.primaryBorder};
`;

export const MainContentWithSidebar = styled.main`
  flex: 1;
  overflow-y: auto;
  height: 100vh;
`;

export const PageHeader = styled.header`
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const PageSubtitle = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

export const PageActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ContentSection = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;
