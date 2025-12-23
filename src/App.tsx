import { useState, useCallback } from "react";
import { TaskUtilityProvider, useTaskUtility } from "./context";
import type { PreparationTask, ThemeName } from "./model";
import { ThemeProvider } from "./theme";
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
import { store } from "./store";
import { Provider as ReduxStoreProvider } from "react-redux";
import { usePrimeReactEditorStyle } from "./utils";

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


  // Style prime react editor
  usePrimeReactEditorStyle();

  

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
  const [themeName, setThemeName] = useState<ThemeName>("light");

  return (
    <ReduxStoreProvider store={store}>
      <ThemeProvider themeName={themeName}>
        <TaskUtilityProvider setTheme={setThemeName} themeName={themeName}>
          <AppContent />
        </TaskUtilityProvider>
      </ThemeProvider>
    </ReduxStoreProvider>
  );
};

export default App;
