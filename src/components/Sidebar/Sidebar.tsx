import React from "react";
import { FiSettings, FiFolder, FiPlus, FiCode } from "react-icons/fi";
import { cx } from "@emotion/css";
import type { Group } from "../../model";
import {
  sidebarStyles,
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

interface SidebarProps {
  readonly groups: ReadonlyArray<Group>;
  readonly selectedGroupId: string | null;
  readonly onGroupSelect: (groupId: string | null) => void;
  readonly onNewGroup: () => void;
  readonly getGroupTaskCount: (groupId: string) => number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  groups,
  selectedGroupId,
  onGroupSelect,
  onNewGroup,
  getGroupTaskCount,
}) => {
  return (
    <aside className={sidebarStyles}>
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
          onClick={() => onGroupSelect(null)}
        >
          <span className={sidebarMenuItemIconStyles}>
            <FiSettings size={18} />
          </span>
          <span className={sidebarMenuItemTextStyles}>Settings</span>
        </button>
      </div>

      <div className={sidebarSectionStyles}>
        <div className={sidebarSectionTitleStyles}>Groups</div>
        {groups.map((group) => {
          const taskCount = getGroupTaskCount(group.id);
          return (
            <button
              key={group.id}
              className={cx(
                selectedGroupId === group.id
                  ? sidebarMenuItemActiveStyles
                  : sidebarMenuItemStyles
              )}
              onClick={() => onGroupSelect(group.id)}
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
        <button className={addGroupButtonStyles} onClick={onNewGroup}>
          <FiPlus size={18} />
          New Group
        </button>
      </div>
    </aside>
  );
};
