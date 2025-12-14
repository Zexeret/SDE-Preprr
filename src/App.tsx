import { useState, useEffect, useRef } from "react";
import {
  FiPlus,
  FiDownload,
  FiUpload,
  FiRefreshCw,
  FiFolder,
} from "react-icons/fi";
import type { PreparationTask, Tag, Group, SortBy, SortOrder } from "./types";
import {
  loadTasks,
  saveTasks,
  loadCustomTags,
  saveCustomTags,
  loadCustomGroups,
  saveCustomGroups,
  loadSelectedGroup,
  saveSelectedGroup,
  exportData,
  importData,
} from "./utils";
import { TaskForm } from "./components/ProblemForm";
import { TaskList } from "./components/ProblemList";
import { FilterBar } from "./components/FilterBar";
import { Stats } from "./components/Stats";
import {
  AppContainer,
  Header,
  HeaderActions,
  Button,
  MainContent,
  Card,
  Modal,
  ModalContent,
  FileInput,
  FileInputLabel,
  GroupHeader,
  GroupSelector,
  GroupButton,
} from "./styled";
import { ThemeProvider, type ThemeName } from "./theme";
import { PREDEFINED_GROUPS, DEFAULT_GROUP_ID } from "./constants";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("dark");
  const [tasks, setTasks] = useState<ReadonlyArray<PreparationTask>>([]);
  const [customTags, setCustomTags] = useState<ReadonlyArray<Tag>>([]);
  const [customGroups, setCustomGroups] = useState<ReadonlyArray<Group>>([]);
  const [selectedGroupId, setSelectedGroupId] =
    useState<string>(DEFAULT_GROUP_ID);
  const [showModal, setShowModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [editingTask, setEditingTask] = useState<PreparationTask | undefined>();
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // Load data on mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    const loadedTags = loadCustomTags();
    const loadedGroups = loadCustomGroups();
    const loadedSelectedGroup = loadSelectedGroup();

    // Initialize order property if it doesn't exist
    const tasksWithOrder = loadedTasks.map((task, index) => ({
      ...task,
      order: task.order !== undefined ? task.order : index,
    }));

    setTasks(tasksWithOrder);
    setCustomTags(loadedTags);
    setCustomGroups(loadedGroups);
    setSelectedGroupId(loadedSelectedGroup);

    setTimeout(() => {
      isInitialMount.current = false;
    }, 0);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (!isInitialMount.current) {
      saveTasks(tasks);
    }
  }, [tasks]);

  // Save custom tags whenever they change
  useEffect(() => {
    if (!isInitialMount.current) {
      saveCustomTags(customTags);
    }
  }, [customTags]);

  // Save custom groups whenever they change
  useEffect(() => {
    if (!isInitialMount.current) {
      saveCustomGroups(customGroups);
    }
  }, [customGroups]);

  // Save selected group whenever it changes
  useEffect(() => {
    if (!isInitialMount.current) {
      saveSelectedGroup(selectedGroupId);
    }
  }, [selectedGroupId]);

  const allGroups = [...PREDEFINED_GROUPS, ...customGroups];
  const currentGroup = allGroups.find((g) => g.id === selectedGroupId);

  // Filter tasks by selected group
  const groupTasks = tasks.filter((task) => task.groupId === selectedGroupId);

  const handleAddTask = (task: PreparationTask) => {
    const newTask = {
      ...task,
      order: groupTasks.length,
    };
    setTasks((prev) => [...prev, newTask]);
    setShowModal(false);
  };

  const handleUpdateTask = (updatedTask: PreparationTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setShowModal(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleToggleDone = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, isDone: !t.isDone, updatedAt: Date.now() } : t
      )
    );
  };

  const handleAddCustomTag = (tag: Tag) => {
    setCustomTags((prev) => [...prev, tag]);
  };

  const handleAddCustomGroup = () => {
    if (!newGroupName.trim()) return;

    const groupId = newGroupName.toLowerCase().replace(/\s+/g, "-");
    const newGroup: Group = {
      id: `custom-${groupId}-${Date.now()}`,
      name: newGroupName.trim(),
      isCustom: true,
      createdAt: Date.now(),
    };

    setCustomGroups((prev) => [...prev, newGroup]);
    setSelectedGroupId(newGroup.id);
    setNewGroupName("");
    setShowGroupModal(false);
  };

  const handleResetProgress = () => {
    if (
      window.confirm(
        `Are you sure you want to mark all tasks in "${currentGroup?.name}" as undone?`
      )
    ) {
      setTasks((prev) =>
        prev.map((t) =>
          t.groupId === selectedGroupId
            ? { ...t, isDone: false, updatedAt: Date.now() }
            : t
        )
      );
    }
  };

  const handleExport = () => {
    exportData(tasks, customTags, customGroups);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importData(file);

      if (
        window.confirm(
          `This will import ${data.tasks.length} tasks, ${
            data.customTags?.length || 0
          } custom tags, and ${
            data.customGroups?.length || 0
          } custom groups. Continue?`
        )
      ) {
        setTasks(data.tasks);
        setCustomTags(data.customTags || []);
        setCustomGroups(data.customGroups || []);

        saveTasks(data.tasks);
        saveCustomTags(data.customTags || []);
        saveCustomGroups(data.customGroups || []);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to import data");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenAddModal = () => {
    setEditingTask(undefined);
    setShowModal(true);
  };

  const handleOpenEditModal = (task: PreparationTask) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(undefined);
  };

  const handleClearFilters = () => {
    setSelectedFilterTags([]);
    setSelectedDifficulty([]);
    setShowDoneOnly(false);
    setShowUndoneOnly(false);
  };

  const handleReorderTasks = (
    reorderedTasks: ReadonlyArray<PreparationTask>
  ) => {
    // Update tasks in state
    setTasks((prev) => {
      // Replace tasks with reordered ones
      const otherGroupTasks = prev.filter((t) => t.groupId !== selectedGroupId);
      return [...otherGroupTasks, ...reorderedTasks];
    });
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

  // When not grouped and using default sort, use custom order
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

  const getGroupTaskCount = (groupId: string): number => {
    return tasks.filter((t) => t.groupId === groupId).length;
  };

  return (
    <ThemeProvider themeName={themeName}>
      <AppContainer>
        <Header>
          <h1>🚀 DSA Manager</h1>
          <HeaderActions>
            <Button variant="primary" onClick={handleOpenAddModal}>
              <FiPlus size={16} />
              Add Task
            </Button>
            <Button
              variant="secondary"
              onClick={handleExport}
              disabled={tasks.length === 0}
            >
              <FiDownload size={16} />
              Export
            </Button>
            <FileInputLabel htmlFor="import-file">
              <FiUpload size={16} />
              Import
            </FileInputLabel>
            <FileInput
              id="import-file"
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleImport}
            />
            <Button
              variant="danger"
              onClick={handleResetProgress}
              disabled={
                groupTasks.length === 0 || !groupTasks.some((t) => t.isDone)
              }
            >
              <FiRefreshCw size={16} />
              Reset Progress
            </Button>
          </HeaderActions>
        </Header>

        <MainContent>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Groups</h2>
              <Button variant="primary" onClick={() => setShowGroupModal(true)}>
                <FiFolder size={16} />
                New Group
              </Button>
            </div>
            <GroupSelector>
              {allGroups.map((group) => (
                <GroupButton
                  key={group.id}
                  active={selectedGroupId === group.id}
                  onClick={() => setSelectedGroupId(group.id)}
                >
                  {group.name}
                  <span
                    style={{
                      fontSize: "0.75rem",
                      opacity: 0.8,
                      marginLeft: "0.25rem",
                    }}
                  >
                    ({getGroupTaskCount(group.id)})
                  </span>
                </GroupButton>
              ))}
            </GroupSelector>
          </Card>

          <Stats tasks={groupTasks} />

          {groupTasks.length > 0 && (
            <Card>
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
                    <GroupHeader>
                      {tagName}{" "}
                      <span className="count">({tagTasks.length})</span>
                    </GroupHeader>
                    <TaskList
                      tasks={tagTasks}
                      onEdit={handleOpenEditModal}
                      onDelete={handleDeleteTask}
                      onToggleDone={handleToggleDone}
                      enableDragDrop={false}
                    />
                  </div>
                ))
              ) : (
                <TaskList
                  tasks={filteredTasks}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteTask}
                  onToggleDone={handleToggleDone}
                  onReorder={handleReorderTasks}
                  enableDragDrop={shouldUseCustomOrder}
                />
              )}
            </Card>
          )}

          {groupTasks.length === 0 && (
            <Card>
              <TaskList
                tasks={[]}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteTask}
                onToggleDone={handleToggleDone}
                enableDragDrop={false}
              />
            </Card>
          )}
        </MainContent>

        {showModal && (
          <Modal onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
              <TaskForm
                task={editingTask}
                customTags={customTags}
                groupId={selectedGroupId}
                onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                onCancel={handleCloseModal}
                onAddCustomTag={handleAddCustomTag}
              />
            </ModalContent>
          </Modal>
        )}

        {showGroupModal && (
          <Modal onClick={() => setShowGroupModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>Create New Group</h2>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Group Name *
                </label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g., System Design, OOP Concepts"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "#f1f5f9",
                    fontSize: "0.875rem",
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomGroup();
                    }
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowGroupModal(false);
                    setNewGroupName("");
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleAddCustomGroup}>
                  Create Group
                </Button>
              </div>
            </ModalContent>
          </Modal>
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
