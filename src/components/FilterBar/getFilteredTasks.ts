import type { PreparationTask } from "../../model";
import type { FilterToApplyType } from "./FilterToApplyType";

export const getFilteredTasks = (tasks: ReadonlyArray<PreparationTask>, groupId: string, filter: FilterToApplyType): ReadonlyArray<PreparationTask> => {
    return tasks.filter((task) => {
        const isInGroup = task.groupId === groupId;
        if (!isInGroup) return false;
        
        const matchesTag = filter.tagId ? task.tags.some(tag => tag.id === filter.tagId) : true;
        const matchesDifficulty = filter.difficultyId ? task.difficulty === filter.difficultyId : true;
        const matchesCompletionStatus =
            filter.completionStatus === 'All' ? true :
            filter.completionStatus === 'Done' ? task.isDone :
            !task.isDone;

        return matchesTag && matchesDifficulty && matchesCompletionStatus;
    });
}