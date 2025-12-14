import { useState, useRef, useMemo, useCallback } from "react";
import { FiPlus, FiDownload, FiUpload, FiRefreshCw } from "react-icons/fi";
import { cx } from "@emotion/css";
import { useApp } from "./context";
import { exportData, importData } from "./utils";
import { PREDEFINED_GROUPS } from "./constants";
import type { Group, PreparationTask, SortBy, SortOrder } from "./model";
import { ThemeProvider, type ThemeName } from "./theme";
import {
  GroupSelector,
  Stats,
  FilterBar,
  TaskList,
  TaskForm,
} from "./components";
import {
  buttonPrimaryStyles,
  buttonSecondaryStyles,
  buttonDangerStyles,
  fileInputHiddenStyles,
  fileInputLabelStyles,
  modalOverlayStyles,
  modalContentStyles,
  cardGlassStyles,
} from "./styles";
import {
  appContainerStyles,
  headerStyles,
  titleStyles,
  headerActionsStyles,
  mainContentStyles,
  formGroupStyles,
  modalActionsStyles,
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allGroups = useMemo(
    () => [...PREDEFINED_GROUPS, ...customGroups],
    [customGroups]
  );

  const currentGroup = useMemo(
    () => allGroups.find((g) => g.id === selectedGroupId),
    [allGroups, selectedGroupId]
  );

  const groupTasks = useMemo(
    () => tasks.filter((task) => task.groupId === selectedGroupId),
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

  const handleResetProgress = () => {
    if (
      window.confirm(
        `Are you sure you want to mark all tasks in "${currentGroup?.name}" as undone?`
      )
    ) {
      resetGroupProgress();
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
      <div className={cx(appContainerStyles)}>
        <header className={headerStyles}>
          <h1 className={titleStyles}>🚀 DSA Manager</h1>
          <div className={headerActionsStyles}>
            <button
              className={buttonPrimaryStyles}
              onClick={handleOpenAddModal}
            >
              <FiPlus size={16} />
              Add Task
            </button>
            <button
              className={buttonSecondaryStyles}
              onClick={handleExport}
              disabled={tasks.length === 0}
            >
              <FiDownload size={16} />
              Export
            </button>
            <label htmlFor="import-file" className={fileInputLabelStyles}>
              <FiUpload size={16} />
              Import
            </label>
            <input
              id="import-file"
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleImport}
              className={fileInputHiddenStyles}
            />
            <button
              className={buttonDangerStyles}
              onClick={handleResetProgress}
              disabled={
                groupTasks.length === 0 || !groupTasks.some((t) => t.isDone)
              }
            >
              <FiRefreshCw size={16} />
              Reset Progress
            </button>
          </div>
        </header>

        <main className={mainContentStyles}>
          <GroupSelector
            groups={allGroups}
            selectedGroupId={selectedGroupId}
            onGroupSelect={setSelectedGroupId}
            onNewGroup={() => setShowGroupModal(true)}
            getGroupTaskCount={getGroupTaskCount}
          />

          <Stats tasks={groupTasks} />

          {groupTasks.length > 0 && (
            <div className={cardGlassStyles}>
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
            </div>
          )}

          {groupTasks.length === 0 && (
            <div className={cardGlassStyles}>
              <TaskList
                tasks={[]}
                onEdit={handleOpenEditModal}
                onDelete={deleteTask}
                onToggleDone={toggleTaskDone}
                enableDragDrop={false}
              />
            </div>
          )}
        </main>

        {showTaskModal && (
          <div className={modalOverlayStyles} onClick={handleCloseTaskModal}>
            <div
              className={modalContentStyles}
              onClick={(e) => e.stopPropagation()}
            >
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
            </div>
          </div>
        )}

        {showGroupModal && (
          <div
            className={modalOverlayStyles}
            onClick={() => setShowGroupModal(false)}
          >
            <div
              className={modalContentStyles}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Create New Group</h2>
              <div className={formGroupStyles}>
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
              </div>
              <div className={modalActionsStyles}>
                <button
                  className={buttonSecondaryStyles}
                  onClick={() => {
                    setShowGroupModal(false);
                    setNewGroupName("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className={buttonPrimaryStyles}
                  onClick={handleAddCustomGroup}
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
