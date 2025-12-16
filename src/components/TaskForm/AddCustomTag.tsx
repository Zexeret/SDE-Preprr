import { memo, useCallback, useState } from "react";
import { AddCustomTagContainer } from "./TaskForm.styles";
import { ButtonPrimary } from "../../sharedStyles";
import { useTaskUtility } from "../../context";
import type { Tag } from "../../model";
import { FiPlus } from "react-icons/fi";

export const AddCustomTag = memo(
  () => {
    const [newTagName, setNewTagName] = useState<string>("");
    const { addCustomTag, selectedGroupId } = useTaskUtility();

    const handleAddCustomTag = useCallback(() => {
      if (!newTagName.trim()) return;

      const tagId = newTagName.toLowerCase().replace(/\s+/g, "-");
      const newTag: Tag = {
        id: `custom-${tagId}-${Date.now()}`,
        name: newTagName.trim(),
        isCustom: true,
        groupId: selectedGroupId ?? undefined,
      };

      addCustomTag(newTag);
      setNewTagName("");
    }, [addCustomTag, newTagName, selectedGroupId]);

    return (
      <AddCustomTagContainer>
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="Enter custom tag name"
          style={{ flex: 1 }}
        />
        <ButtonPrimary onClick={handleAddCustomTag}>
          <FiPlus size={12} style={{ marginRight: "4px" }} />
          Add Custom Tag
        </ButtonPrimary>
      </AddCustomTagContainer>
    );
  }
);
