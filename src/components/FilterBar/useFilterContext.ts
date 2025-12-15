import { createContext, useContext } from "react";
import type { PreparationTask } from "../../model";
import type { FilterToApplyType } from "./FilterToApplyType";


export type FilterContextType = {
    readonly filteredAndSortedTasks: ReadonlyArray<PreparationTask>;
    readonly showTags: boolean;
    readonly setShowTags: (show: boolean) => void;
    readonly showDifficulty: boolean;
    readonly setShowDifficulty: (show: boolean) => void;
    readonly currentFilterToApply: FilterToApplyType;
    readonly setCurrentFilterToApply: React.Dispatch<
      React.SetStateAction<FilterToApplyType>
    >;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilterContext must be used within a FilterContextProvider");
    }
    return context;

}
