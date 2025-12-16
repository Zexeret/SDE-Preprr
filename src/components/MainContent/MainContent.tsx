import { memo } from "react";
import { ContentHeader } from "./ContentHeader";
import { MainContentContainer } from "./MainContent.styles";
import { Stats } from "../Stats";
import { FilterBar, FilterContextProvider } from "../FilterBar";
import { TaskList } from "../TaskList";
import type { PreparationTask } from "../../model";
import { CardGlass } from "../../sharedStyles";

type MainContentProps = {
  readonly openAddTaskModal: (task: PreparationTask | null) => void;
};

export const MainContent = memo<MainContentProps>(({ openAddTaskModal }) => {
  return (
    <FilterContextProvider>
      <MainContentContainer>
        <ContentHeader openAddTaskModal={openAddTaskModal} />

        <Stats />

        <CardGlass>
          <FilterBar />

          <TaskList onEdit={openAddTaskModal} enableDragDrop={true} />
        </CardGlass>
      </MainContentContainer>
    </FilterContextProvider>
  );
});
