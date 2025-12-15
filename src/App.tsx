import { useState, useMemo, useCallback } from "react";
import { TaskUtilityProvider, useTaskUtility } from "./context";
import { PREDEFINED_GROUPS } from "./constants";
import type { Group, PreparationTask, SortBy, SortOrder } from "./model";
import { ThemeProvider, type ThemeName } from "./theme";
import { Sidebar, Settings, TaskForm, MainContent } from "./components";
import {
  ButtonPrimary,
  ButtonSecondary,
  ModalOverlay,
  ModalContent,
  ModalActions,
  FormGroup,
} from "./styles";
import {
  AppContainer,
  MainContentWithSidebar,
  SideBarContainer,
} from "./App.styles";

function AppContent() {
  const {
    tasks,
    customTags,
    customGroups,
    selectedGroupId,
    setSelectedGroupId,
    setCustomGroups,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
    reorderTasks,
    addCustomTag,
    deleteCustomTag,
  } = useTaskUtility();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [currentTaskInFormModal, setCurrentTaskInFormModal] =
    useState<PreparationTask | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedFilterTags, setSelectedFilterTags] = useState<
    ReadonlyArray<string>
  >([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    ReadonlyArray<string>
  >([]);
  const [sortBy, setSortBy] = useState<SortBy>("dateAdded");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [groupByTag, setGroupByTag] = useState(false);
  const [showDoneOnly, setShowDoneOnly] = useState(false);
  const [showUndoneOnly, setShowUndoneOnly] = useState(false);

  const groupTasks = useMemo(
    () =>
      selectedGroupId
        ? tasks.filter((task) => task.groupId === selectedGroupId)
        : [],
    [tasks, selectedGroupId]
  );

  const handleAddCustomGroup = useCallback(() => {
    if (!newGroupName.trim()) return;

    const groupId = newGroupName.toLowerCase().replace(/\s+/g, "-");
    const newGroup: Group = {
      id: `custom-${groupId}-${Date.now()}`,
      name: newGroupName.trim(),
      isCustom: true,
      createdAt: Date.now(),
    };

    setCustomGroups([...customGroups, newGroup]);
    setSelectedGroupId(newGroup.id);
    setNewGroupName("");
    setShowGroupModal(false);
  },[customGroups, newGroupName, setCustomGroups, setSelectedGroupId]);

  const handleOpenAddTaskModal = useCallback(() => {
    setCurrentTaskInFormModal(null);
    setShowTaskModal(true);
  },[]);

  // const handleOpenEditModal = (task: PreparationTask) => {
  //   setEditingTask(task);
  //   setShowTaskModal(true);
  // };

  const handleCloseTaskFormModal = useCallback(() => {
    setShowTaskModal(false);
    setCurrentTaskInFormModal(null);
  },[]);

  const handleTaskSubmit = useCallback((task: PreparationTask) => {
    if (currentTaskInFormModal) {
      updateTask(task);
    } else {
      addTask(task);
    }
    handleCloseTaskFormModal();
  },[addTask, currentTaskInFormModal, handleCloseTaskFormModal, updateTask]);


  // Filter tasks
  let filteredTasks = groupTasks.filter((task) => {
    if (showDoneOnly && !task.isDone) return false;
    if (showUndoneOnly && task.isDone) return false;
    if (selectedDifficulty.length > 0) {
      if (!task.tags.some((tag) => selectedDifficulty.includes(tag.id)))
        return false;
    }
    if (selectedFilterTags.length > 0) {
      return task.tags.some((tag) => selectedFilterTags.includes(tag.id));
    }
    return true;
  });

  // Sort tasks
  filteredTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "dateAdded":
        comparison = a.createdAt - b.createdAt;
        break;
      case "dateUpdated":
        comparison = a.updatedAt - b.updatedAt;
        break;
      case "status":
        comparison = (a.isDone ? 1 : 0) - (b.isDone ? 1 : 0);
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const shouldUseCustomOrder =
    !groupByTag && sortBy === "dateAdded" && sortOrder === "desc";
  if (shouldUseCustomOrder) {
    filteredTasks = [...filteredTasks].sort((a, b) => a.order - b.order);
  }

  // Group tasks by tag
  const groupedTasks: Record<string, ReadonlyArray<PreparationTask>> = {};
  if (groupByTag) {
    filteredTasks.forEach((task) => {
      if (task.tags.length === 0) {
        if (!groupedTasks["Untagged"]) {
          groupedTasks["Untagged"] = [];
        }
        groupedTasks["Untagged"] = [...groupedTasks["Untagged"], task];
      } else {
        task.tags.forEach((tag) => {
          if (!groupedTasks[tag.name]) {
            groupedTasks[tag.name] = [];
          }
          groupedTasks[tag.name] = [...groupedTasks[tag.name], task];
        });
      }
    });
  }

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
          onSubmit={handleTaskSubmit}
          onClose={handleCloseTaskFormModal}
        />
      )}

      {showGroupModal && (
        <ModalOverlay onClick={() => setShowGroupModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Create New Group</h2>
            <FormGroup>
              <label>Group Name *</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g., System Design, OOP Concepts"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomGroup();
                  }
                }}
              />
            </FormGroup>
            <ModalActions>
              <ButtonSecondary
                onClick={() => {
                  setShowGroupModal(false);
                  setNewGroupName("");
                }}
              >
                Cancel
              </ButtonSecondary>
              <ButtonPrimary onClick={handleAddCustomGroup}>
                Create Group
              </ButtonPrimary>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
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
