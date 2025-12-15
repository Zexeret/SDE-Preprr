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
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
`;

export const MainContentWithSidebar = styled.main`
  flex: 1;
  overflow-y: auto;
  height: 100vh;
`;