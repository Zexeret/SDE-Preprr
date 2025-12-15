import { css } from "@emotion/css";
import styled from "@emotion/styled";

export const SideBarContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

export const sidebarHeaderStyles = css`
  margin-bottom: 2rem;
`;

export const sidebarTitleStyles = css`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const sidebarNavigationStyles = css`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const sidebarSectionStyles = css`
  margin-bottom: 1.5rem;
`;

export const sidebarSectionTitleStyles = css`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-bottom: 0.75rem;
`;

export const sidebarMenuItemStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #94a3b8;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  background: transparent;
  width: 100%;
  text-align: left;
  font-size: 0.875rem;

  &:hover {
    background: rgba(51, 65, 85, 0.5);
    color: #f1f5f9;
  }
`;

export const sidebarMenuItemActiveStyles = css`
  ${sidebarMenuItemStyles}
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-color: rgba(99, 102, 241, 0.3);

  &:hover {
    background: rgba(99, 102, 241, 0.15);
    color: #6366f1;
  }
`;

export const sidebarMenuItemIconStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
`;

export const sidebarMenuItemTextStyles = css`
  flex: 1;
  font-weight: 500;
`;

export const sidebarMenuItemBadgeStyles = css`
  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const navItemStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    color: #c7d2fe;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const navItemActiveStyles = css`
  ${navItemStyles}
  background: #6366f1;
  color: white;

  &:hover {
    background: #5558e3;
    color: white;
  }
`;

export const navItemContentStyles = css`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const navItemBadgeStyles = css`
  background: rgba(148, 163, 184, 0.2);
  color: #94a3b8;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const navItemBadgeActiveStyles = css`
  ${navItemBadgeStyles}
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

export const addGroupButtonContainerStyles = css`
  padding: 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
`;

export const addGroupButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const sidebarFooterStyles = css`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
`;

export const mainContentWithSidebarStyles = css`
  margin-left: 280px;
  padding: 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;
