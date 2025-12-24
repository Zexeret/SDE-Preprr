import { memo } from "react";
import { FormGroup, Label } from "../../sharedStyles";
import { Editor } from "primereact/editor";
import { useSelector } from "react-redux";
import { selectModeInTaskModal } from "../../store";

type NotesProps = {
  readonly notes: string;
  readonly setNotes: (value: string) => void;
};

export const Notes = memo<NotesProps>(({ notes, setNotes }) => {
  const mode = useSelector(selectModeInTaskModal);

  return (
    <FormGroup>
      <Label>Notes</Label>
      <Editor
        key={mode}
        value={notes}
        onTextChange={(e) => setNotes(e.htmlValue || "")}
        style={{ height: "300px" }}
        readOnly={mode === "view"}
      />
    </FormGroup>
  );
});
