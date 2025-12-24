import { memo, useState } from "react";
import { ButtonPrimary, FormGroup, Label } from "../../sharedStyles";
import { Editor } from "primereact/editor";
import { useSelector } from "react-redux";
import { selectModeInTaskModal } from "../../store";
import { FiEye } from "react-icons/fi";

type PostCompletionNotesProps = {
  readonly postCompletionNotes: string;
  readonly setPostCompletionNotes: (value: string) => void;
};

export const PostCompletionNotes = memo<PostCompletionNotesProps>(
  ({ postCompletionNotes, setPostCompletionNotes }) => {
    const mode = useSelector(selectModeInTaskModal);
    const [showCompletionNotes, setShowCompletionNotes] =
      useState<boolean>(false);

    if (mode !== 'view' || showCompletionNotes) {
      return (
        <FormGroup>
          <Label>Post Completion Notes</Label>
          <Editor
            value={postCompletionNotes}
            onTextChange={(e) => setPostCompletionNotes(e.htmlValue || "")}
            style={{ height: "300px" }}
            readOnly={mode === 'view'}
          />
        </FormGroup>
      );
    } else {
      return (
        <ButtonPrimary onClick={() => setShowCompletionNotes(true)}>
          Show Post Completion Notes
          <FiEye size={16} />
        </ButtonPrimary>
      );
    }
  }
);
