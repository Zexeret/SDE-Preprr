import { memo, useCallback, useMemo } from "react";
import { FiSettings, FiFolder, FiPlus } from "react-icons/fi";
import {
  SideBarContainer,
  SidebarHeader,
  SidebarTitle,
  SidebarSection,
  SidebarSectionTitle,
  SidebarMenuItem,
  SidebarMenuItemIcon,
  SidebarMenuItemText,
  SidebarMenuItemBadge,
  SidebarFooter,
  AddGroupButton,
  CodeIcon,
} from "./Sidebar.styles";
import { useTaskUtility } from "../../context";
import { PREDEFINED_GROUPS } from "../../constants";

type SidebarProps = {
  readonly onNewGroupButtonClick: () => void;
};

export const Sidebar = memo<SidebarProps>(({ onNewGroupButtonClick }) => {
  const { tasks, customGroups, selectedGroupId, setSelectedGroupId } =
    useTaskUtility();

  const allGroups = useMemo(
    () => [...PREDEFINED_GROUPS, ...customGroups],
    [customGroups]
  );

  const handleMenuItemClick = useCallback(
    (groupId: string | null) => {
      setSelectedGroupId(groupId);
    },
    [setSelectedGroupId]
  );

  const getGroupTaskCount = useCallback(
    (groupId: string): number => {
      return tasks.filter((t) => t.groupId === groupId).length;
    },
    [tasks]
  );

  return (
    <SideBarContainer>
      <SidebarHeader>
        <SidebarTitle>
          <CodeIcon size={24} />
          DSA Manager
        </SidebarTitle>
      </SidebarHeader>

      <SidebarSection>
        <SidebarSectionTitle>General</SidebarSectionTitle>
        <SidebarMenuItem
          $isActive={selectedGroupId === null}
          onClick={() => handleMenuItemClick(null)}
        >
          <SidebarMenuItemIcon>
            <FiSettings size={18} />
          </SidebarMenuItemIcon>
          <SidebarMenuItemText>Settings</SidebarMenuItemText>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection>
        <SidebarSectionTitle>Groups</SidebarSectionTitle>
        {allGroups.map((group) => {
          const taskCount = getGroupTaskCount(group.id);
          return (
            <SidebarMenuItem
              key={group.id}
              $isActive={selectedGroupId === group.id}
              onClick={() => handleMenuItemClick(group.id)}
            >
              <SidebarMenuItemIcon>
                <FiFolder size={18} />
              </SidebarMenuItemIcon>
              <SidebarMenuItemText>{group.name}</SidebarMenuItemText>
              {taskCount > 0 && (
                <SidebarMenuItemBadge>{taskCount}</SidebarMenuItemBadge>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarSection>

      <SidebarFooter>
        <AddGroupButton onClick={onNewGroupButtonClick}>
          <FiPlus size={18} />
          New Group
        </AddGroupButton>
      </SidebarFooter>
    </SideBarContainer>
  );
});
