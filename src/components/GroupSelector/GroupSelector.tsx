import React from "react";
import { FiFolder } from "react-icons/fi";
import { cx } from "@emotion/css";
import type { Group } from "../../model";
import { buttonPrimaryStyles, cardGlassStyles } from "../../styles";
import {
  groupSelectorContainerStyles,
  groupButtonStyles,
  groupButtonActiveStyles,
  groupHeaderContainerStyles,
  groupTitleStyles,
  groupCountStyles,
} from "./GroupSelector.styles";

interface GroupSelectorProps {
  readonly groups: ReadonlyArray<Group>;
  readonly selectedGroupId: string;
  readonly onGroupSelect: (groupId: string) => void;
  readonly onNewGroup: () => void;
  readonly getGroupTaskCount: (groupId: string) => number;
}

export const GroupSelector: React.FC<GroupSelectorProps> = ({
  groups,
  selectedGroupId,
  onGroupSelect,
  onNewGroup,
  getGroupTaskCount,
}) => {
  return (
    <div className={cardGlassStyles}>
      <div className={groupHeaderContainerStyles}>
        <h2 className={groupTitleStyles}>Groups</h2>
        <button className={buttonPrimaryStyles} onClick={onNewGroup}>
          <FiFolder size={16} />
          New Group
        </button>
      </div>
      <div className={groupSelectorContainerStyles}>
        {groups.map((group) => (
          <button
            key={group.id}
            className={cx(
              selectedGroupId === group.id
                ? groupButtonActiveStyles
                : groupButtonStyles
            )}
            onClick={() => onGroupSelect(group.id)}
          >
            {group.name}
            <span className={groupCountStyles}>
              ({getGroupTaskCount(group.id)})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
