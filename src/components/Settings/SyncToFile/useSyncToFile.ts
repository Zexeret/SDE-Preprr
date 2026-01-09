import { useCallback } from "react";
import { useSelector } from "react-redux";
import { isFileSystemAccessSupported } from "../../../fileBackup";
import type { SaveFrequency } from "../../../model";
import {
  createFileThunk,
  disconnectFile,
  openFileThunk,
  requestPermissionThunk,
  selectFileName,
  selectHasFilePermission,
  selectIsAutoSaveEnabled,
  selectIsFileConnected,
  selectIsFileLoading,
  selectIsFileSaving,
  selectLastSavedAt,
  selectPeriodicInterval,
  selectSaveFrequency,
  setAutoSaveEnabled,
  setPeriodicInterval,
  setSaveFrequency,
  triggerManualSave,
  useAppDispatch,
} from "../../../store";
import { useLastSavedDisplay } from "./useLastSavedDisplay";

export interface UseSyncToFileReturn {
  // State
  readonly isSupported: boolean;
  readonly autoSaveEnabled: boolean;
  readonly saveFrequency: SaveFrequency;
  readonly periodicIntervalMinutes: number;
  readonly lastSavedAt: number | null;
  readonly fileName: string | null;
  readonly hasPermission: boolean;
  readonly isConnected: boolean;
  readonly isSaving: boolean;
  readonly isLoading: boolean;
  readonly lastSavedDisplay: string;

  // Actions
  readonly handleOpenFile: () => void;
  readonly handleCreateFile: () => void;
  readonly handleDisconnect: () => void;
  readonly handleRequestPermission: () => void;
  readonly handleSaveNow: () => void;
  readonly handleAutoSaveToggle: () => void;
  readonly handleSaveFrequencyChange: (frequency: SaveFrequency) => void;
  readonly handlePeriodicIntervalChange: (minutes: number) => void;
}

export const useSyncToFile = (): UseSyncToFileReturn => {
  const dispatch = useAppDispatch();
  const isSupported = isFileSystemAccessSupported();

  // Read from Redux store (single source of truth)
  const autoSaveEnabled = useSelector(selectIsAutoSaveEnabled);
  const saveFrequency = useSelector(selectSaveFrequency);
  const periodicIntervalMinutes = useSelector(selectPeriodicInterval);
  const lastSavedAt = useSelector(selectLastSavedAt);
  const fileName = useSelector(selectFileName);
  const hasPermission = useSelector(selectHasFilePermission);
  const isConnected = useSelector(selectIsFileConnected);
  const isSaving = useSelector(selectIsFileSaving);
  const isLoading = useSelector(selectIsFileLoading);

  // Use dedicated hook for last saved display
  const lastSavedDisplay = useLastSavedDisplay();

  // Handle connect file (open existing)
  const handleOpenFile = useCallback(() => {
    dispatch(openFileThunk())
      .unwrap()
      .catch((error: string) => alert(error));
  }, [dispatch]);

  // Handle create new file
  const handleCreateFile = useCallback(() => {
    dispatch(createFileThunk())
      .unwrap()
      .catch((error: string) => alert(error));
  }, [dispatch]);

  // Handle disconnect - just dispatch action, listener handles the service call
  const handleDisconnect = useCallback(() => {
    dispatch(disconnectFile());
  }, [dispatch]);

  // Handle request permission
  const handleRequestPermission = useCallback(() => {
    dispatch(requestPermissionThunk())
      .unwrap()
      .catch((error: string) => alert(error));
  }, [dispatch]);

  // Handle save now - just dispatch action, listener handles the rest
  const handleSaveNow = useCallback(() => {
    if (!isConnected) {
      alert("No file connected. Please connect a file first.");
      return;
    }
    dispatch(triggerManualSave());
  }, [dispatch, isConnected]);

  // Handle auto-save toggle - just dispatch, listener handles periodic save
  const handleAutoSaveToggle = useCallback(() => {
    dispatch(setAutoSaveEnabled(!autoSaveEnabled));
  }, [autoSaveEnabled, dispatch]);

  // Handle save frequency change - just dispatch, listener handles periodic save
  const handleSaveFrequencyChange = useCallback(
    (frequency: SaveFrequency) => {
      dispatch(setSaveFrequency(frequency));
    },
    [dispatch]
  );

  // Handle periodic interval change - just dispatch, listener handles restart
  const handlePeriodicIntervalChange = useCallback(
    (minutes: number) => {
      dispatch(setPeriodicInterval(minutes));
    },
    [dispatch]
  );

  return {
    isSupported,
    autoSaveEnabled,
    saveFrequency,
    periodicIntervalMinutes,
    lastSavedAt,
    fileName,
    hasPermission,
    isConnected,
    isSaving,
    isLoading,
    lastSavedDisplay,
    handleOpenFile,
    handleCreateFile,
    handleDisconnect,
    handleRequestPermission,
    handleSaveNow,
    handleAutoSaveToggle,
    handleSaveFrequencyChange,
    handlePeriodicIntervalChange,
  };
};
