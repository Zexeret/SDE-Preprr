import { memo } from "react";
import { FiFile, FiLink } from "react-icons/fi";
import { SettingsActions } from "../Settings.styles";
import { ButtonPrimary, ButtonSecondary } from "../../../sharedStyles";

interface SyncToFileDisconnectedProps {
  readonly onOpenFile: () => void;
  readonly onCreateFile: () => void;
}

export const SyncToFileDisconnected = memo<SyncToFileDisconnectedProps>(
  ({ onOpenFile, onCreateFile }) => {
    return (
      <SettingsActions>
        <ButtonPrimary onClick={onOpenFile}>
          <FiLink size={16} />
          Open Existing File
        </ButtonPrimary>
        <ButtonSecondary onClick={onCreateFile}>
          <FiFile size={16} />
          Create New File
        </ButtonSecondary>
      </SettingsActions>
    );
  }
);
