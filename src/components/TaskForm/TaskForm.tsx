import React, { memo, useCallback, useState } from "react";
import { DifficultyTagId, type PreparationTask } from "../../model";
import {
  FormGroup,
  ModalContent,
  ModalOverlay,
  Label,
  Input,
} from "../../sharedStyles";
import { Editor } from "primereact/editor";
import { FormContainer } from "./TaskForm.styles";
import { generateId } from "../../utils";
import {
  addTask,
  closeTaskModal,
  ORDER_SEPARATOR_BASE,
  selectActiveGroupId,
  selectActiveTaskInModal,
  selectMaxOrderFromTasks,
  updateTask,
  useAppDispatch,
} from "../../store";
import { useSelector } from "react-redux";
import { TaskFormHeader } from "./TaskFormHeader";
import { DifficultyTagInput } from "./DifficultyTagInput";
import { TagInput } from "./TagInput";
import { ActionButtons } from "./ActionButtons";

interface TaskFormProps {
  readonly selectedGroupId: string;
  readonly currentTaskInModalId: string | null;
}

export const TaskForm = memo<TaskFormProps>(() => {
  const editingTask = useSelector(selectActiveTaskInModal);
  const selectedGroupId = useSelector(selectActiveGroupId);
  const maxOrder = useSelector(selectMaxOrderFromTasks);

  const [title, setTitle] = useState<string>(editingTask?.title ?? "");
  const [link, setLink] = useState<string | null>(editingTask?.link ?? null);
  const [notes, setNotes] = useState<string>(editingTask?.notes ?? "");
  const [postCompletionNotes, setPostCompletionNotes] = useState<string>(
    editingTask?.postCompletionNotes ?? ""
  );
  const [difficulty, setDifficulty] = useState<DifficultyTagId>(
    editingTask?.difficulty ?? DifficultyTagId.EASY
  );
  const [selectedTags, setSelectedTags] = useState<ReadonlySet<string>>(
    new Set(editingTask?.tags ?? [])
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
      const isNewTask = editingTask === null;
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
          id: editingTask.id,
          isDone: editingTask.isDone || false,
          createdAt: editingTask.createdAt,
          order: editingTask.order,
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
      editingTask,
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

            <FormGroup>
              <Label>Notes</Label>
              <Editor
                value={notes}
                onTextChange={(e) => setNotes(e.htmlValue || "")}
                style={{ height: "300px" }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Post Completion Notes</Label>
              <Editor
                value={postCompletionNotes}
                onTextChange={(e) => setPostCompletionNotes(e.htmlValue || "")}
                style={{ height: "300px" }}
              />
            </FormGroup>
          </form>
        </FormContainer>

        <ActionButtons onClose={handleCloseModal} handleSubmit={handleSubmit} />
      </ModalContent>
    </ModalOverlay>
  );
});
