import { memo, useCallback, useState } from "react";
import { AddCustomTagContainer } from "./TaskForm.styles";
import { ButtonPrimary, Input } from "../../sharedStyles";
import { useTaskUtility } from "../../context";
import type { Tag } from "../../model";
import { FiPlus } from "react-icons/fi";
import { generateId } from "../../utils";

export const AddCustomTag = memo(
  () => {
    const [newTagName, setNewTagName] = useState<string>("");
    const { addCustomTag, selectedGroupId } = useTaskUtility();

    const handleAddCustomTag = useCallback(() => {
      if (!newTagName.trim()) return;

      const newTag: Tag = {
        id: generateId('tag'),
        name: newTagName.trim(),
        isCustom: true,
        groupId: selectedGroupId ?? undefined,
      };

      addCustomTag(newTag);
      setNewTagName("");
    }, [addCustomTag, newTagName, selectedGroupId]);

    return (
      <AddCustomTagContainer>
        <Input
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
