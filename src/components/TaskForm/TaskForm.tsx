import React, { memo, useCallback, useState } from "react";
import { DifficultyTagId, type PreparationTask } from "../../model";
import {
  FormGroup,
  ModalContent,
  ModalOverlay,
  Label,
  Input,
} from "../../sharedStyles";
import { FormContainer } from "./TaskForm.styles";
import { generateId } from "../../utils";
import {
  addTask,
  closeTaskModal,
  ORDER_SEPARATOR_BASE,
  selectActiveGroupId,
  selectMaxOrderFromTasks,
  selectModeInTaskModal,
  updateTask,
  useAppDispatch,
} from "../../store";
import { useSelector } from "react-redux";
import { TaskFormHeader } from "./TaskFormHeader";
import { DifficultyTagInput } from "./DifficultyTagInput";
import { TagInput } from "./TagInput";
import { ActionButtons } from "./ActionButtons";
import { PostCompletionNotes } from "./PostCompletionNotes";
import { Notes } from "./Notes";

interface TaskFormProps {
  readonly currentTaskInModal: PreparationTask | null;
}

export const TaskForm = memo<TaskFormProps>(({ currentTaskInModal }) => {
  const isViewMode = useSelector(selectModeInTaskModal) === "view";
  const selectedGroupId = useSelector(selectActiveGroupId);
  const maxOrder = useSelector(selectMaxOrderFromTasks);

  const [title, setTitle] = useState<string>(currentTaskInModal?.title ?? "");
  const [link, setLink] = useState<string | null>(
    currentTaskInModal?.link ?? null
  );
  const [notes, setNotes] = useState<string>(currentTaskInModal?.notes ?? "");
  const [postCompletionNotes, setPostCompletionNotes] = useState<string>(
    currentTaskInModal?.postCompletionNotes ?? ""
  );
  const [difficulty, setDifficulty] = useState<DifficultyTagId>(
    currentTaskInModal?.difficulty ?? DifficultyTagId.EASY
  );
  const [selectedTags, setSelectedTags] = useState<ReadonlySet<string>>(
    new Set(currentTaskInModal?.tags ?? [])
  );

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(closeTaskModal());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedGroupId) return;

      if (!title.trim()) {
        alert("Please enter a task title");
        return;
      }

      const now = Date.now();
      const isNewTask = currentTaskInModal === null;
      let taskData: PreparationTask = {
        groupId: selectedGroupId,
        title: title.trim(),
        link,
        difficulty,
        tags: Array.from(selectedTags),
        notes,
        postCompletionNotes,
        updatedAt: now,
        // Different fields based on add/edit mode.
        id: generateId("task"),
        isDone: false,
        createdAt: now,
        order: maxOrder + ORDER_SEPARATOR_BASE,
      };

      if (!isNewTask) {
        taskData = {
          ...taskData,
          id: currentTaskInModal.id,
          isDone: currentTaskInModal.isDone || false,
          createdAt: currentTaskInModal.createdAt,
          order: currentTaskInModal.order,
        };
        dispatch(
          updateTask({
            id: taskData.id,
            changes: taskData,
          })
        );
      } else {
        dispatch(addTask(taskData));
      }

      handleCloseModal();
    },
    [
      selectedGroupId,
      title,
      currentTaskInModal,
      link,
      difficulty,
      selectedTags,
      notes,
      postCompletionNotes,
      maxOrder,
      handleCloseModal,
      dispatch,
    ]
  );

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TaskFormHeader onClose={handleCloseModal} />

        <FormContainer>
          <form>
            <FormGroup>
              <Label htmlFor="task-title">Title *</Label>
              <Input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Binary Search or Max Depth of Binary Tree"
                required
                readOnly={isViewMode}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="task-link">Link</Label>
              <Input
                id="task-link"
                type="text"
                value={link ?? ""}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://leetcode.com/problems/..."
                readOnly={isViewMode}
              />
            </FormGroup>

            <DifficultyTagInput
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />

            <TagInput
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />

            <Notes notes={notes} setNotes={setNotes} />

            <PostCompletionNotes
              postCompletionNotes={postCompletionNotes}
              setPostCompletionNotes={setPostCompletionNotes}
            />
          </form>
        </FormContainer>

        <ActionButtons onClose={handleCloseModal} handleSubmit={handleSubmit} />
      </ModalContent>
    </ModalOverlay>
  );
});
