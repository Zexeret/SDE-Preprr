import  { memo, useMemo } from "react";
import { ContentHeader } from "./ContentHeader";
import { MainContentContainer } from "./MainContent.styles";
import { PREDEFINED_GROUPS } from "../../constants";
import { useTaskUtility } from "../../context";
import { Stats } from "../Stats";
import { CardGlass } from "../../styles";
import { FilterBar } from "../FilterBar";

type MainContentProps = {
  readonly openAddTaskModal: () => void;
};

export const MainContent = memo<MainContentProps>(({ openAddTaskModal }) => {
  const { customGroups, selectedGroupId } = useTaskUtility();

  const allGroups = useMemo(
    () => [...PREDEFINED_GROUPS, ...customGroups],
    [customGroups]
  );

  const currentSelectedGroup = useMemo(
    () =>
      selectedGroupId ? allGroups.find((g) => g.id === selectedGroupId) : null,
    [allGroups, selectedGroupId]
  );

  if (!currentSelectedGroup) {
    return null;
  }
  return (
    <MainContentContainer>
      <ContentHeader
        currentSelectedGroup={currentSelectedGroup}
        openAddTaskModal={openAddTaskModal}
      />

      <Stats />

      <CardGlass>
        <FilterBar />
        {/* {groupTasks.length > 0 &&
          (groupByTag ? (
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
          ))} */}
      </CardGlass>

      {/* {groupTasks.length === 0 && (
        <CardGlass>
          <TaskList
            tasks={[]}
            onEdit={handleOpenEditModal}
            onDelete={deleteTask}
            onToggleDone={toggleTaskDone}
            enableDragDrop={false}
          />
        </CardGlass>
      )}  */}
    </MainContentContainer>
  );
});
