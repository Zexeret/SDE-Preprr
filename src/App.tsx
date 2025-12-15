import { useState, useCallback } from "react";
import { TaskUtilityProvider, useTaskUtility } from "./context";
import type { PreparationTask } from "./model";
import { ThemeProvider, type ThemeName } from "./theme";
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
    <ThemeProvider themeName={themeName}>
      <TaskUtilityProvider setTheme={setThemeName}>
        <AppContent />
      </TaskUtilityProvider>
    </ThemeProvider>
  );
};

export default App;
