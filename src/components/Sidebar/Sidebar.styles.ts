import styled from "@emotion/styled";
import { FiCode } from "react-icons/fi";
import { ButtonPrimary } from "../../sharedStyles";

export const SidebarContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

export const SidebarHeader = styled.div`
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const CodeIcon = styled(FiCode)`
  color: ${({ theme }) => theme.primary};
`;


export const AppTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AppSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.muted};
  margin: 0;
`;

export const NavSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
  padding: 0 0.5rem;
`;

export const NavItem = styled.button<{ readonly $isActive?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.primary + "1a" : "transparent"};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.text.secondary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${({ theme, $isActive }) =>
      $isActive ? theme.primary + "1a" : theme.surfaceHover};
    color: ${({ theme }) => theme.text.primary};
  }

  svg {
    font-size: 1.125rem;
    flex-shrink: 0;
  }
`;

export const NavItemCount = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text.muted};
  font-weight: 600;
`;

export const AddGroupButton = styled(ButtonPrimary)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 1rem 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: center;
`;
