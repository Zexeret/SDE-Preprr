import { useState, useMemo, useCallback } from "react";
import { TaskUtilityProvider, useTaskUtility } from "./context";
import type { Group, PreparationTask, SortBy, SortOrder } from "./model";
import { ThemeProvider, type ThemeName } from "./theme";
import { Sidebar, Settings, TaskForm, MainContent, AddGroupModal } from "./components";
import {
  AppContainer,
  MainContentWithSidebar,
  SideBarContainer,
} from "./App.styles";

function AppContent() {
  const {selectedGroupId} = useTaskUtility();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [currentTaskInFormModal, setCurrentTaskInFormModal] =
    useState<PreparationTask | null>(null);


  const handleOpenAddTaskModal = useCallback((task: PreparationTask | null) => {
    setCurrentTaskInFormModal(task);
    setShowTaskModal(true);
  },[]);

  const handleCloseTaskFormModal = useCallback(() => {
    setShowTaskModal(false);
    setCurrentTaskInFormModal(null);
  },[]);

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
          // <ContentSection>
          //   <PageHeader>
          //     <PageTitle>{currentGroup?.name}</PageTitle>
          //     <PageSubtitle>
          //       Manage your {currentGroup?.name.toLowerCase()} preparation tasks
          //     </PageSubtitle>
          //     <PageActions>
          //       <ButtonPrimary onClick={handleOpenAddModal}>
          //         <FiPlus size={16} />
          //         Add Task
          //       </ButtonPrimary>
          //     </PageActions>
          //   </PageHeader>

          //   <Stats tasks={groupTasks} />

          //   <CardGlass>
          //     <FilterBar
          //       customTags={customTags}
          //       selectedFilterTags={selectedFilterTags}
          //       sortBy={sortBy}
          //       sortOrder={sortOrder}
          //       groupByTag={groupByTag}
          //       showDoneOnly={showDoneOnly}
          //       showUndoneOnly={showUndoneOnly}
          //       tasks={groupTasks}
          //       selectedDifficulty={selectedDifficulty}
          //       selectedGroupId={selectedGroupId}
          //       onFilterTagsChange={setSelectedFilterTags}
          //       onSortByChange={setSortBy}
          //       onSortOrderChange={setSortOrder}
          //       onGroupByTagChange={setGroupByTag}
          //       onShowDoneOnlyChange={setShowDoneOnly}
          //       onShowUndoneOnlyChange={setShowUndoneOnly}
          //       onDifficultyChange={setSelectedDifficulty}
          //       onClearFilters={handleClearFilters}
          //     />
          //     {groupTasks.length > 0 &&
          //       (groupByTag ? (
          //         Object.entries(groupedTasks).map(([tagName, tagTasks]) => (
          //           <div key={tagName}>
          //             <h3>
          //               {tagName} <span>({tagTasks.length})</span>
          //             </h3>
          //             <TaskList
          //               tasks={tagTasks}
          //               onEdit={handleOpenEditModal}
          //               onDelete={deleteTask}
          //               onToggleDone={toggleTaskDone}
          //               enableDragDrop={false}
          //             />
          //           </div>
          //         ))
          //       ) : (
          //         <TaskList
          //           tasks={filteredTasks}
          //           onEdit={handleOpenEditModal}
          //           onDelete={deleteTask}
          //           onToggleDone={toggleTaskDone}
          //           onReorder={reorderTasks}
          //           enableDragDrop={shouldUseCustomOrder}
          //         />
          //       ))}
          //   </CardGlass>

          //   {groupTasks.length === 0 && (
          //     <CardGlass>
          //       <TaskList
          //         tasks={[]}
          //         onEdit={handleOpenEditModal}
          //         onDelete={deleteTask}
          //         onToggleDone={toggleTaskDone}
          //         enableDragDrop={false}
          //       />
          //     </CardGlass>
          //   )}
          // </ContentSection>
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
        <AddGroupModal onCloseModal={() => setShowGroupModal(false)}/>
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
