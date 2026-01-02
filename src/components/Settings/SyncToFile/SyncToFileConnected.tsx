import { memo } from "react";
import { FiFile, FiSave, FiX } from "react-icons/fi";
import { SettingsActions } from "../Settings.styles";
import {
  ButtonPrimary,
  ButtonSecondary,
  FormGroup,
  Label,
  Select,
} from "../../../sharedStyles";
import type { SaveFrequency } from "../../../model";
import {
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  ConnectedFileInfo,
  FileNameDisplay,
  LastSavedText,
  StatusBadge,
  SyncSettingsContainer,
} from "./SyncToFile.styles";
import { PERIODIC_OPTIONS } from "./constants";

interface SyncToFileConnectedProps {
  readonly fileName: string | null;
  readonly hasPermission: boolean;
  readonly lastSavedDisplay: string;
  readonly autoSaveEnabled: boolean;
  readonly saveFrequency: SaveFrequency;
  readonly periodicIntervalMinutes: number;
  readonly isSaving: boolean;
  readonly onRequestPermission: () => void;
  readonly onAutoSaveToggle: () => void;
  readonly onSaveFrequencyChange: (frequency: SaveFrequency) => void;
  readonly onPeriodicIntervalChange: (minutes: number) => void;
  readonly onSaveNow: () => void;
  readonly onDisconnect: () => void;
}

export const SyncToFileConnected = memo<SyncToFileConnectedProps>(
  ({
    fileName,
    hasPermission,
    lastSavedDisplay,
    autoSaveEnabled,
    saveFrequency,
    periodicIntervalMinutes,
    isSaving,
    onRequestPermission,
    onAutoSaveToggle,
    onSaveFrequencyChange,
    onPeriodicIntervalChange,
    onSaveNow,
    onDisconnect,
  }) => {
    return (
      <SyncSettingsContainer>
        <ConnectedFileInfo>
          <FileNameDisplay>
            <FiFile size={16} />
            <span>{fileName}</span>
            <StatusBadge $hasPermission={hasPermission}>
              {hasPermission ? "Connected" : "Permission Required"}
            </StatusBadge>
          </FileNameDisplay>
          <LastSavedText>Last saved: {lastSavedDisplay}</LastSavedText>
        </ConnectedFileInfo>

        {!hasPermission && (
          <ButtonPrimary onClick={onRequestPermission}>
            Grant Permission
          </ButtonPrimary>
        )}

        {hasPermission && (
          <>
            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                id="auto-save-toggle"
                checked={autoSaveEnabled}
                onChange={onAutoSaveToggle}
              />
              <CheckboxLabel htmlFor="auto-save-toggle">
                Enable auto-save to this file
              </CheckboxLabel>
            </CheckboxContainer>

            {autoSaveEnabled && (
              <FormGroup>
                <Label>Save Frequency</Label>
                <Select
                  value={saveFrequency}
                  onChange={(e) =>
                    onSaveFrequencyChange(e.target.value as SaveFrequency)
                  }
                >
                  <option value="everyChange">On every change</option>
                  <option value="periodic">Periodically</option>
                </Select>

                {saveFrequency === "periodic" && (
                  <Select
                    value={periodicIntervalMinutes}
                    onChange={(e) =>
                      onPeriodicIntervalChange(Number(e.target.value))
                    }
                    style={{ marginTop: "0.5rem" }}
                  >
                    {PERIODIC_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                )}
              </FormGroup>
            )}

            <SettingsActions>
              <ButtonPrimary onClick={onSaveNow} disabled={isSaving}>
                <FiSave size={16} />
                {isSaving ? "Saving..." : "Save Now"}
              </ButtonPrimary>
              <ButtonSecondary onClick={onDisconnect}>
                <FiX size={16} />
                Disconnect File
              </ButtonSecondary>
            </SettingsActions>
          </>
        )}
      </SyncSettingsContainer>
    );
  }
);
