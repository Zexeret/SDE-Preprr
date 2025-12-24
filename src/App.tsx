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
import {
  selectActiveGroupId,
  selectActiveTaskInModal,
  selectIsGroupModalOpen,
  selectIsTaskModalOpen,
  selectThemename,
} from "./store";
import { useSelector } from "react-redux";
import { useLoadAppData, usePrimeReactEditorStyle } from "./utils";

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
        {selectedGroupId === null ? <Settings /> : <MainContent />}
      </MainContentWithSidebar>

      {showTaskModal && selectedGroupId && (
        <TaskForm
          currentTaskInModal={currentTaskInModal}

        />
      )}

      {showGroupModal && <AddGroupModal />}
    </AppContainer>
  );
}

const App = () => {
  const themeName = useSelector(selectThemename);

  return (
    <ThemeProvider themeName={themeName}>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
