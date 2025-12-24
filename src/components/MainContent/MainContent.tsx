import { memo } from "react";
import { ContentHeader } from "./ContentHeader";
import { MainContentContainer } from "./MainContent.styles";
import { Stats } from "../Stats";
import { FilterBar } from "../FilterBar";
import { TaskList } from "../TaskList";
import { CardGlass } from "../../sharedStyles";

export const MainContent = memo(() => {
  return (
    <MainContentContainer>
      <ContentHeader />

      <Stats />

      <CardGlass>
        <FilterBar />

        <TaskList enableDragDrop={true} />
      </CardGlass>
    </MainContentContainer>
  );
});
