import { useState, useEffect, useRef } from "react";
import { FiPlus, FiDownload, FiUpload, FiRefreshCw } from "react-icons/fi";
import type { Problem, Tag, SortBy, SortOrder } from "./types";
import {
  loadProblems,
  saveProblems,
  loadCustomTags,
  saveCustomTags,
  exportData,
  importData,
} from "./utils";
import { ProblemForm } from "./components/ProblemForm";
import { ProblemList } from "./components/ProblemList";
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
} from "./styled";
import { ThemeProvider, type ThemeName } from "./theme";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>('dark');
  const [problems, setProblems] = useState<ReadonlyArray<Problem>>([]);
  const [customTags, setCustomTags] = useState<Array<Tag>>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | undefined>();
  const [selectedFilterTags, setSelectedFilterTags] = useState<Array<string>>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Array<string>>([]);
  const [sortBy, setSortBy] = useState<SortBy>("dateAdded");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [groupByTag, setGroupByTag] = useState(false);
  const [showDoneOnly, setShowDoneOnly] = useState(false);
  const [showUndoneOnly, setShowUndoneOnly] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // Load data on mount
  useEffect(() => {
    const loadedProblems = loadProblems();
    const loadedTags = loadCustomTags();

    // Initialize order property if it doesn't exist
    const problemsWithOrder = loadedProblems.map((problem, index) => ({
      ...problem,
      order: problem.order !== undefined ? problem.order : index,
    }));

    setProblems(problemsWithOrder);
    setCustomTags(loadedTags);

    // Use setTimeout to ensure the flag is set after state updates
    setTimeout(() => {
      isInitialMount.current = false;
    }, 0);
  }, []);

  // Save problems whenever they change (skip initial mount)
  useEffect(() => {
    if (!isInitialMount.current) {
      console.log("Saving problems:", problems.length);
      saveProblems(problems);
    }
  }, [problems]);

  // Save custom tags whenever they change (skip initial mount)
  useEffect(() => {
    if (!isInitialMount.current) {
      console.log("Saving tags:", customTags.length);
      saveCustomTags(customTags);
    }
  }, [customTags]);

  const handleAddProblem = (problem: Problem) => {
    const newProblem = {
      ...problem,
      order: problems.length,
    };
    setProblems((prev) => [...prev, newProblem]);
    setShowModal(false);
  };

  const handleUpdateProblem = (updatedProblem: Problem) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === updatedProblem.id ? updatedProblem : p))
    );
    setShowModal(false);
    setEditingProblem(undefined);
  };

  const handleDeleteProblem = (problemId: string) => {
    setProblems((prev) => prev.filter((p) => p.id !== problemId));
  };

  const handleToggleDone = (problemId: string) => {
    setProblems((prev) =>
      prev.map((p) =>
        p.id === problemId
          ? { ...p, isDone: !p.isDone, updatedAt: Date.now() }
          : p
      )
    );
  };

  const handleAddCustomTag = (tag: Tag) => {
    setCustomTags((prev) => [...prev, tag]);
  };

  const handleResetProgress = () => {
    if (
      window.confirm("Are you sure you want to mark all problems as undone?")
    ) {
      setProblems((prev) =>
        prev.map((p) => ({ ...p, isDone: false, updatedAt: Date.now() }))
      );
    }
  };

  const handleExport = () => {
    exportData(problems, customTags);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importData(file);

      if (
        window.confirm(
          `This will import ${data.problems.length} problems and ${
            data.customTags?.length || 0
          } custom tags. Continue?`
        )
      ) {
        // Update state and immediately persist to localStorage
        setProblems(data.problems);
        setCustomTags(data.customTags || []);

        // Immediately save to localStorage to ensure persistence
        saveProblems(data.problems);
        saveCustomTags(data.customTags || []);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to import data");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenAddModal = () => {
    setEditingProblem(undefined);
    setShowModal(true);
  };

  const handleOpenEditModal = (problem: Problem) => {
    setEditingProblem(problem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProblem(undefined);
  };

  const handleClearFilters = () => {
    setSelectedFilterTags([]);
    setSelectedDifficulty([]);
    setShowDoneOnly(false);
    setShowUndoneOnly(false);
  };

  const handleReorderProblems = (reorderedProblems: Array<Problem>) => {
    setProblems(reorderedProblems);
  };

  // Filter problems
  let filteredProblems = problems.filter((problem) => {
    if (showDoneOnly && !problem.isDone) return false;
    if (showUndoneOnly && problem.isDone) return false;
    if (selectedDifficulty.length > 0) {
      if (!problem.tags.some((tag) => selectedDifficulty.includes(tag.id)))
        return false;
    }
    if (selectedFilterTags.length > 0) {
      return problem.tags.some((tag) => selectedFilterTags.includes(tag.id));
    }
    return true;
  });

  // Sort problems
  filteredProblems = [...filteredProblems].sort((a, b) => {
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

  // When not grouped and using default sort (dateAdded desc), use custom order
  const shouldUseCustomOrder =
    !groupByTag && sortBy === "dateAdded" && sortOrder === "desc";
  if (shouldUseCustomOrder) {
    filteredProblems = [...filteredProblems].sort((a, b) => a.order - b.order);
  }

  // Group problems by tag
  const groupedProblems: Record<string, Array<Problem>> = {};
  if (groupByTag) {
    filteredProblems.forEach((problem) => {
      if (problem.tags.length === 0) {
        if (!groupedProblems["Untagged"]) {
          groupedProblems["Untagged"] = [];
        }
        groupedProblems["Untagged"].push(problem);
      } else {
        problem.tags.forEach((tag) => {
          if (!groupedProblems[tag.name]) {
            groupedProblems[tag.name] = [];
          }
          groupedProblems[tag.name].push(problem);
        });
      }
    });
  }

  return (
    <ThemeProvider themeName={themeName}>
      <AppContainer>
        <Header>
          <h1>🚀 DSA Manager</h1>
          <HeaderActions>
            <Button variant="primary" onClick={handleOpenAddModal}>
              <FiPlus size={16} />
              Add Problem
            </Button>
            <Button
              variant="secondary"
              onClick={handleExport}
              disabled={problems.length === 0}
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
                problems.length === 0 || !problems.some((p) => p.isDone)
              }
            >
              <FiRefreshCw size={16} />
              Reset Progress
            </Button>
          </HeaderActions>
        </Header>

        <MainContent>
          <Stats problems={problems} />

          {problems.length > 0 && (
            <Card>
              <FilterBar
                customTags={customTags}
                selectedFilterTags={selectedFilterTags}
                sortBy={sortBy}
                sortOrder={sortOrder}
                groupByTag={groupByTag}
                showDoneOnly={showDoneOnly}
                showUndoneOnly={showUndoneOnly}
                problems={problems}
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
                Object.entries(groupedProblems).map(
                  ([tagName, tagProblems]) => (
                    <div key={tagName}>
                      <GroupHeader>
                        {tagName}{" "}
                        <span className="count">({tagProblems.length})</span>
                      </GroupHeader>
                      <ProblemList
                        problems={tagProblems}
                        onEdit={handleOpenEditModal}
                        onDelete={handleDeleteProblem}
                        onToggleDone={handleToggleDone}
                        enableDragDrop={false}
                      />
                    </div>
                  )
                )
              ) : (
                <ProblemList
                  problems={filteredProblems}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteProblem}
                  onToggleDone={handleToggleDone}
                  onReorder={handleReorderProblems}
                  enableDragDrop={shouldUseCustomOrder}
                />
              )}
            </Card>
          )}

          {problems.length === 0 && (
            <Card>
              <ProblemList
                problems={[]}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteProblem}
                onToggleDone={handleToggleDone}
                enableDragDrop={false}
              />
            </Card>
          )}
        </MainContent>

        {showModal && (
          <Modal onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>{editingProblem ? "Edit Problem" : "Add New Problem"}</h2>
              <ProblemForm
                problem={editingProblem}
                customTags={customTags}
                onSubmit={
                  editingProblem ? handleUpdateProblem : handleAddProblem
                }
                onCancel={handleCloseModal}
                onAddCustomTag={handleAddCustomTag}
              />
            </ModalContent>
          </Modal>
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
