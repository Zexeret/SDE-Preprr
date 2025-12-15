import { useState, useRef, useMemo, useCallback } from "react";
import { FiPlus } from "react-icons/fi";
import { useApp } from "./context";
import { PREDEFINED_GROUPS } from "./constants";
import type { Group, PreparationTask, SortBy, SortOrder, Tag } from "./model";
import { ThemeProvider, type ThemeName } from "./theme";
import {
  Sidebar,
  Settings,
  Stats,
  FilterBar,
  TaskList,
  TaskForm,
} from "./components";
import {
  ButtonPrimary,
  ButtonSecondary,
  ModalOverlay,
  ModalContent,
  ModalActions,
  CardGlass,
  FormGroup,
} from "./styles";
import {
  AppContainer,
  MainContentWithSidebar,
  PageHeader,
  PageTitle,
  PageSubtitle,
  PageActions,
  ContentSection,
} from "./App.styles";

function App() {
  const [themeName] = useState<ThemeName>("dark");
  const {
    tasks,
    customTags,
    customGroups,
    selectedGroupId,
    setSelectedGroupId,
    resetGroupProgress,
    setTasks,
    setCustomTags,
    setCustomGroups,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
    reorderTasks,
    addCustomTag,
    deleteCustomTag,
  } = useApp();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingTask, setEditingTask] = useState<PreparationTask | undefined>();
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

  const allGroups = useMemo(
    () => [...PREDEFINED_GROUPS, ...customGroups],
    [customGroups]
  );

  const currentGroup = useMemo(
    () =>
      selectedGroupId ? allGroups.find((g) => g.id === selectedGroupId) : null,
    [allGroups, selectedGroupId]
  );

  const groupTasks = useMemo(
    () =>
      selectedGroupId
        ? tasks.filter((task) => task.groupId === selectedGroupId)
        : [],
    [tasks, selectedGroupId]
  );

  const getGroupTaskCount = useCallback(
    (groupId: string): number => {
      return tasks.filter((t) => t.groupId === groupId).length;
    },
    [tasks]
  );

  const handleAddCustomGroup = () => {
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
  };

  const handleResetGroupProgress = () => {
    if (!currentGroup) return;
    if (
      window.confirm(
        `Are you sure you want to mark all tasks in "${currentGroup.name}" as undone?`
      )
    ) {
      resetGroupProgress();
    }
  };

  const handleResetAllProgress = () => {
    setTasks(
      tasks.map((task) => ({
        ...task,
        isDone: false,
        updatedAt: Date.now(),
      }))
    );
  };

  const handleImport = (data: {
    tasks: Array<PreparationTask>;
    customTags?: Array<Tag>;
    customGroups?: Array<Group>;
  }) => {
    setTasks(data.tasks);
    setCustomTags(data.customTags || []);
    setCustomGroups(data.customGroups || []);
  };

  const handleOpenAddModal = () => {
    setEditingTask(undefined);
    setShowTaskModal(true);
  };

  const handleOpenEditModal = (task: PreparationTask) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setEditingTask(undefined);
  };

  const handleTaskSubmit = (task: PreparationTask) => {
    if (editingTask) {
      updateTask(task);
    } else {
      const newTask = {
        ...task,
        order: groupTasks.length,
      };
      addTask(newTask);
    }
    handleCloseTaskModal();
  };

  const handleClearFilters = () => {
    setSelectedFilterTags([]);
    setSelectedDifficulty([]);
    setShowDoneOnly(false);
    setShowUndoneOnly(false);
  };

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
    <ThemeProvider themeName={themeName}>
      <AppContainer>
        <Sidebar
          groups={allGroups}
          selectedGroupId={selectedGroupId}
          onGroupSelect={setSelectedGroupId}
          onNewGroup={() => setShowGroupModal(true)}
          getGroupTaskCount={getGroupTaskCount}
        />

        <MainContentWithSidebar>
          {selectedGroupId === null ? (
            <Settings
              tasks={tasks}
              customTags={customTags}
              customGroups={customGroups}
              onImport={handleImport}
              onResetAll={handleResetAllProgress}
            />
          ) : (
            <ContentSection>
              <PageHeader>
                <PageTitle>{currentGroup?.name}</PageTitle>
                <PageSubtitle>
                  Manage your {currentGroup?.name.toLowerCase()} preparation
                  tasks
                </PageSubtitle>
                <PageActions>
                  <ButtonPrimary onClick={handleOpenAddModal}>
                    <FiPlus size={16} />
                    Add Task
                  </ButtonPrimary>
                </PageActions>
              </PageHeader>

              <Stats tasks={groupTasks} />

              {groupTasks.length > 0 && (
                <CardGlass>
                  <FilterBar
                    customTags={customTags}
                    selectedFilterTags={selectedFilterTags}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    groupByTag={groupByTag}
                    showDoneOnly={showDoneOnly}
                    showUndoneOnly={showUndoneOnly}
                    tasks={groupTasks}
                    selectedDifficulty={selectedDifficulty}
                    selectedGroupId={selectedGroupId}
                    onFilterTagsChange={setSelectedFilterTags}
                    onSortByChange={setSortBy}
                    onSortOrderChange={setSortOrder}
                    onGroupByTagChange={setGroupByTag}
                    onShowDoneOnlyChange={setShowDoneOnly}
                    onShowUndoneOnlyChange={setShowUndoneOnly}
                    onDifficultyChange={setSelectedDifficulty}
                    onClearFilters={handleClearFilters}
                  />

                  {groupByTag ? (
                    Object.entries(groupedTasks).map(([tagName, tagTasks]) => (
                      <div key={tagName}>
                        <h3>
                          {tagName} <span>({tagTasks.length})</span>
                        </h3>
                        <TaskList
                          tasks={tagTasks}
                          onEdit={handleOpenEditModal}
                          onDelete={deleteTask}
                          onToggleDone={toggleTaskDone}
                          enableDragDrop={false}
                        />
                      </div>
                    ))
                  ) : (
                    <TaskList
                      tasks={filteredTasks}
                      onEdit={handleOpenEditModal}
                      onDelete={deleteTask}
                      onToggleDone={toggleTaskDone}
                      onReorder={reorderTasks}
                      enableDragDrop={shouldUseCustomOrder}
                    />
                  )}
                </CardGlass>
              )}

              {groupTasks.length === 0 && (
                <CardGlass>
                  <TaskList
                    tasks={[]}
                    onEdit={handleOpenEditModal}
                    onDelete={deleteTask}
                    onToggleDone={toggleTaskDone}
                    enableDragDrop={false}
                  />
                </CardGlass>
              )}
            </ContentSection>
          )}
        </MainContentWithSidebar>

        {showTaskModal && selectedGroupId && (
          <ModalOverlay onClick={handleCloseTaskModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
              <TaskForm
                task={editingTask}
                customTags={customTags}
                groupId={selectedGroupId}
                onSubmit={handleTaskSubmit}
                onCancel={handleCloseTaskModal}
                onAddCustomTag={addCustomTag}
                onDeleteCustomTag={deleteCustomTag}
              />
            </ModalContent>
          </ModalOverlay>
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
    </ThemeProvider>
  );
}

export default App;
