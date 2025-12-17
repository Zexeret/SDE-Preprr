import { memo, useCallback, useMemo } from "react";
import { FiSettings, FiFolder, FiPlus } from "react-icons/fi";
import { useTaskUtility } from "../../context";
import { PREDEFINED_GROUPS } from "../../model";
import {
  AddGroupButton,
  AppSubtitle,
  AppTitle,
  CodeIcon,
  NavItem,
  NavItemCount,
  NavSection,
  SectionTitle,
  SidebarContainer,
  SidebarFooter,
  SidebarHeader,
} from "./Sidebar.styles";

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
    <SidebarContainer>
      <SidebarHeader>
        <AppTitle>
          <CodeIcon size={24} />
          DSA Manager
        </AppTitle>
        <AppSubtitle>Track your progress</AppSubtitle>
      </SidebarHeader>

      <NavSection>
        <SectionTitle>Views</SectionTitle>
        <NavItem
          $isActive={selectedGroupId === null}
          onClick={() => handleMenuItemClick(null)}
        >
          <FiSettings size={18} />
          <span>Settings</span>
        </NavItem>
      </NavSection>

      <NavSection>
        <SectionTitle>Groups</SectionTitle>
        {allGroups.map((group) => {
          const taskCount = getGroupTaskCount(group.id);
          return (
            <NavItem
              key={group.id}
              $isActive={selectedGroupId === group.id}
              onClick={() => handleMenuItemClick(group.id)}
            >
              <FiFolder size={18} />
              <span>{group.name}</span>
              {taskCount > 0 && <NavItemCount>{taskCount}</NavItemCount>}
            </NavItem>
          );
        })}
      </NavSection>

      <SidebarFooter>
        <AddGroupButton onClick={onNewGroupButtonClick}>
          <FiPlus size={18} />
          New Group
        </AddGroupButton>
      </SidebarFooter>
    </SidebarContainer>
  );
});
