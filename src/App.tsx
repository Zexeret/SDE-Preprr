import { ThemeProvider } from "./theme";
import {
  Sidebar,
  Settings,
  TaskForm,
  MainContent,
  AddGroupModal,
  ErrorBoundary,
  DialogProvider,
} from "./components";
import {
  AppContainer,
  MainContentWithSidebar,
  SideBarContainer,
} from "./App.styles";
import {
  selectActiveGroupId,
  selectActiveTaskInModal,
  selectIsGroupModalOpen,
  selectIsTaskModalOpen,
  selectThemename,
} from "./store";
import { useSelector } from "react-redux";
import { useLoadAppData, usePrimeReactEditorStyle } from "./utils";
import { getLogger } from "./logger";

const log = getLogger("ui:app");

function AppContent() {
  const showTaskModal = useSelector(selectIsTaskModalOpen);
  const showGroupModal = useSelector(selectIsGroupModalOpen);
  const currentTaskInModal = useSelector(selectActiveTaskInModal);
  const selectedGroupId = useSelector(selectActiveGroupId);

  // Style prime react editor
  usePrimeReactEditorStyle();

  //Load data from local storage/ db if any
  useLoadAppData();

  return (
    <AppContainer>
      <SideBarContainer>
        <Sidebar />
      </SideBarContainer>

      <MainContentWithSidebar>
        <ErrorBoundary>
          {selectedGroupId === null ? <Settings /> : <MainContent />}
        </ErrorBoundary>
      </MainContentWithSidebar>

      {showTaskModal && selectedGroupId && (
        <TaskForm currentTaskInModal={currentTaskInModal} />
      )}

      {showGroupModal && <AddGroupModal />}
    </AppContainer>
  );
}

const handleGlobalError = (error: Error, errorInfo: React.ErrorInfo): void => {
  log.error(
    "Global error caught: {} at {}",
    error.message,
    errorInfo.componentStack
  );
};

const App = () => {
  const themeName = useSelector(selectThemename);

  return (
    <ThemeProvider themeName={themeName}>
      <DialogProvider>
        <ErrorBoundary onError={handleGlobalError}>
          <AppContent />
        </ErrorBoundary>
      </DialogProvider>
    </ThemeProvider>
  );
};

export default App;
