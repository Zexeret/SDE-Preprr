import { useState, useCallback, useEffect } from "react";
import { TaskUtilityProvider, useTaskUtility } from "./context";
import type { PreparationTask } from "./model";
import { ThemeProvider, useTheme, type ThemeName } from "./theme";
import {
  Sidebar,
  Settings,
  TaskForm,
  MainContent,
  AddGroupModal,
} from "./components";
import {
  AppContainer,
  MainContentWithSidebar,
  SideBarContainer,
} from "./App.styles";

function AppContent() {
  const { selectedGroupId } = useTaskUtility();
  const theme = useTheme();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [currentTaskInFormModal, setCurrentTaskInFormModal] =
    useState<PreparationTask | null>(null);

  const handleOpenAddTaskModal = useCallback((task: PreparationTask | null) => {
    setCurrentTaskInFormModal(task);
    setShowTaskModal(true);
  }, []);

  const handleCloseTaskFormModal = useCallback(() => {
    setShowTaskModal(false);
    setCurrentTaskInFormModal(null);
  }, []);

  useEffect(() => {
    // Set CSS custom properties when theme changes for editor
    const root = document.documentElement;
    root.style.setProperty("--theme-bg-primary", theme.primary);
    root.style.setProperty("--theme-bg-secondary", theme.surface);
    root.style.setProperty("--theme-bg-elevated", theme.surfaceElevated);
    root.style.setProperty("--theme-border-primary", theme.border);
    root.style.setProperty("--theme-border-secondary", theme.border + "54");
    root.style.setProperty("--theme-text-primary", theme.text.primary);
    root.style.setProperty("--theme-text-secondary", theme.text.secondary);
    root.style.setProperty("--theme-text-muted", theme.text.secondary);
    root.style.setProperty("--theme-primary-main", theme.primary);
  }, [theme]);

  return (
    <AppContainer>
      <SideBarContainer>
        <Sidebar onNewGroupButtonClick={() => setShowGroupModal(true)} />
      </SideBarContainer>

      <MainContentWithSidebar>
        {selectedGroupId === null ? (
          <Settings />
        ) : (
          <MainContent openAddTaskModal={handleOpenAddTaskModal} />
        )}
      </MainContentWithSidebar>

      {showTaskModal && selectedGroupId && (
        <TaskForm
          selectedGroupId={selectedGroupId}
          currentTaskInFormModal={currentTaskInFormModal}
          onClose={handleCloseTaskFormModal}
        />
      )}

      {showGroupModal && (
        <AddGroupModal onCloseModal={() => setShowGroupModal(false)} />
      )}
    </AppContainer>
  );
}

const App = () => {
  const [themeName, setThemeName] = useState<ThemeName>("dark");

  return (
    <ThemeProvider themeName={themeName} >
      <TaskUtilityProvider setTheme={setThemeName} themeName={themeName}>
        <AppContent />
      </TaskUtilityProvider>
    </ThemeProvider>
  );
};

export default App;
