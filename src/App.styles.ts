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
  font-family: Inter, system-ui, -apple-system, sans-serif;
`;

export const SideBarContainer = styled.div`
  height: 100%;
  display: block;
  position: static;
  flex-grow: 0.05;
  background: ${({ theme }) => theme.backgroundSidebar};
  border-right: 1px solid ${({ theme }) => theme.border};
  border-top: none;
  border-bottom: none;
  border-left: none;
`;

export const MainContentWithSidebar = styled.main`
  flex: 1;
  overflow-y: auto;
  height: 100vh;
  scrollbar-width: none;
`;
