import  { memo, useCallback, useMemo } from "react";
import { FiSettings, FiFolder, FiPlus, FiCode } from "react-icons/fi";
import { cx } from "@emotion/css";
import {
  SideBarContainer,
  sidebarHeaderStyles,
  sidebarTitleStyles,
  sidebarSectionStyles,
  sidebarSectionTitleStyles,
  sidebarMenuItemStyles,
  sidebarMenuItemActiveStyles,
  sidebarMenuItemIconStyles,
  sidebarMenuItemTextStyles,
  sidebarMenuItemBadgeStyles,
  sidebarFooterStyles,
  addGroupButtonStyles,
} from "./Sidebar.styles";
import { useTaskUtility } from "../../context";
import { PREDEFINED_GROUPS } from "../../constants";

type SidebarProps = {
  readonly onNewGroupButtonClick: () => void;
}

export const Sidebar = memo<SidebarProps>(({
  onNewGroupButtonClick,
}) => {
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
      <div className={sidebarHeaderStyles}>
        <h1 className={sidebarTitleStyles}>
          <FiCode size={24} />
          DSA Manager
        </h1>
      </div>

      <div className={sidebarSectionStyles}>
        <div className={sidebarSectionTitleStyles}>General</div>
        <button
          className={cx(
            selectedGroupId === null
              ? sidebarMenuItemActiveStyles
              : sidebarMenuItemStyles
          )}
          onClick={() => handleMenuItemClick(null)}
        >
          <span className={sidebarMenuItemIconStyles}>
            <FiSettings size={18} />
          </span>
          <span className={sidebarMenuItemTextStyles}>Settings</span>
        </button>
      </div>

      <div className={sidebarSectionStyles}>
        <div className={sidebarSectionTitleStyles}>Groups</div>
        {allGroups.map((group) => {
          const taskCount = getGroupTaskCount(group.id);
          return (
            <button
              key={group.id}
              className={cx(
                selectedGroupId === group.id
                  ? sidebarMenuItemActiveStyles
                  : sidebarMenuItemStyles
              )}
              onClick={() => handleMenuItemClick(group.id)}
            >
              <span className={sidebarMenuItemIconStyles}>
                <FiFolder size={18} />
              </span>
              <span className={sidebarMenuItemTextStyles}>{group.name}</span>
              {taskCount > 0 && (
                <span className={sidebarMenuItemBadgeStyles}>{taskCount}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className={sidebarFooterStyles}>
        <button className={addGroupButtonStyles} onClick={onNewGroupButtonClick}>
          <FiPlus size={18} />
          New Group
        </button>
      </div>
    </SideBarContainer>
  );
});
