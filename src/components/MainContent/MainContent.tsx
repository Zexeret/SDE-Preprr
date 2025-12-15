import { memo, useMemo, useState } from "react";
import { ContentHeader } from "./ContentHeader";
import { MainContentContainer } from "./MainContent.styles";
import { useTaskUtility } from "../../context";
import { Stats } from "../Stats";
import {
  DEFAULT_FILTER_TO_APPLY,
  FilterBar,
  getFilteredTasks,
  type FilterToApplyType,
} from "../FilterBar";
import { TaskList } from "../TaskList";
import type { PreparationTask } from "../../model";
import { CardGlass } from "../../sharedStyles";

type MainContentProps = {
  readonly openAddTaskModal: (task : PreparationTask | null) => void;
};

export const MainContent = memo<MainContentProps>(({ openAddTaskModal }) => {
  const { tasks, selectedGroupId } = useTaskUtility();
  const [currentFilterToApply, setCurrentFilterToApply] =
    useState<FilterToApplyType>(DEFAULT_FILTER_TO_APPLY);

  const filteredAndSortedTasks = useMemo<ReadonlyArray<PreparationTask>>(() => {
    if (!selectedGroupId) return [];
    return getFilteredTasks(tasks, selectedGroupId, currentFilterToApply);
  }, [currentFilterToApply, selectedGroupId, tasks]);

  return (
    <MainContentContainer>
      <ContentHeader openAddTaskModal={openAddTaskModal} />

      <Stats />

      <CardGlass>
        <FilterBar
          currentFilterToApply={currentFilterToApply}
          setCurrentFilterToApply={setCurrentFilterToApply}
        />
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
        <TaskList
          tasks={filteredAndSortedTasks}
          onEdit={openAddTaskModal}
          enableDragDrop={true}
        />
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
