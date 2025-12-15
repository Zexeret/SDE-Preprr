import styled from "@emotion/styled";
import { FiCode } from "react-icons/fi";
import { ButtonPrimary } from "../../sharedStyles";

export const SideBarContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

export const SidebarHeader = styled.div`
  margin-bottom: 2rem;
`;

export const CodeIcon = styled(FiCode)`
  color: ${(props) => props.theme.primary};
`;

export const SidebarTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: ${(props) => props.theme.text.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SidebarSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const SidebarSectionTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.text.secondary};
  margin-bottom: 0.75rem;
`;

export const SidebarMenuItem = styled.button<{ readonly $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: ${(props) =>
    props.$isActive ? props.theme.primary : props.theme.text.secondary};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid
    ${(props) => (props.$isActive ? props.theme.primary + "54" : "transparent")};
  background: ${(props) =>
    props.$isActive ? `${props.theme.primary}15` : "transparent"};
  width: 100%;
  text-align: left;
  font-size: 0.875rem;
  box-shadow: ${(props) =>
    props.$isActive ? `0 0px 6px ${props.theme.primary}40` : "none"};

  &:hover {
    color: ${(props) =>
      props.$isActive ? props.theme.primary : props.theme.text.primary};
    border-color: ${(props) => props.theme.primary + "54"};
  }
`;

export const SidebarMenuItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
`;

export const SidebarMenuItemText = styled.span`
  flex: 1;
  font-weight: 500;
`;

export const SidebarMenuItemBadge = styled.span`
  background: ${(props) => `${props.theme.primary}20`};
  color: ${(props) => props.theme.primary};
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const AddGroupButton = styled(ButtonPrimary)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.border};
`;
