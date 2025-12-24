import { memo, useCallback, useState } from "react";
import { AddCustomTagContainer } from "./TaskForm.styles";
import { ButtonPrimary, Input } from "../../sharedStyles";
import type { Tag } from "../../model";
import { FiPlus } from "react-icons/fi";
import { generateId } from "../../utils";
import { useSelector } from "react-redux";
import { addTag, selectActiveGroupId, useAppDispatch } from "../../store";

export const AddCustomTag = memo(() => {
  const [newTagName, setNewTagName] = useState<string>("");
  const selectedGroupId = useSelector(selectActiveGroupId);
  const dispatch = useAppDispatch();

  const handleAddCustomTag = useCallback(() => {
    if (!newTagName.trim()) return;

    const newTag: Tag = {
      id: generateId("tag"),
      name: newTagName.trim(),
      isCustom: true,
      groupId: selectedGroupId,
    };

    dispatch(addTag(newTag));
    setNewTagName("");
  }, [dispatch, newTagName, selectedGroupId]);

  return (
    <AddCustomTagContainer>
      <Input
        type="text"
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
        placeholder="Enter custom tag name"
        style={{ flex: 1 }}
      />
      <ButtonPrimary onClick={handleAddCustomTag} type="button">
        <FiPlus size={12} style={{ marginRight: "4px" }} />
        Add Custom Tag
      </ButtonPrimary>
    </AddCustomTagContainer>
  );
});
