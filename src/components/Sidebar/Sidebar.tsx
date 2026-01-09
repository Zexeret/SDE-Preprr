import { memo, useCallback } from "react";
import { FiSettings, FiFolder, FiPlus } from "react-icons/fi";
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
import {
  openGroupModal,
  selectActiveGroupId,
  selectAllGroups,
  selectTaskCountByGroup,
  setSelectedGroupId,
  useAppDispatch,
} from "../../store";
import { useSelector } from "react-redux";
import { getLogger } from "../../logger";

const log = getLogger("ui:sidebar");

export const Sidebar = memo(() => {
  const selectedGroupId = useSelector(selectActiveGroupId);
  const taskCountByGroup = useSelector(selectTaskCountByGroup);
  const allGroups = useSelector(selectAllGroups);
  const dispatch = useAppDispatch();

  const handleMenuItemClick = useCallback(
    (groupId: string | null) => {
      log.debug("Group selected: {}", groupId ?? "Settings");
      dispatch(setSelectedGroupId(groupId));
    },
    [dispatch]
  );

  const handleNewGroupClick = useCallback(() => {
    log.debug("Opening new group modal");
    dispatch(
      openGroupModal({
        isOpen: true,
        mode: "edit",
        groupId: null,
      })
    );
  }, [dispatch]);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <AppTitle>
          <CodeIcon size={24} />
          SDE Preprr
        </AppTitle>
        <AppSubtitle>Your journey companion</AppSubtitle>
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
          const taskCount = taskCountByGroup[group.id] ?? 0;
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
        <AddGroupButton onClick={handleNewGroupClick}>
          <FiPlus size={18} />
          New Group
        </AddGroupButton>
      </SidebarFooter>
    </SidebarContainer>
  );
});
