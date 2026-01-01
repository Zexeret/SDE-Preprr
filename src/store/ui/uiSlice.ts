import { createSlice, type PayloadAction, type WritableDraft } from "@reduxjs/toolkit"; 
import { PredefinedGroupId, type DifficultyTagId, type ThemeName } from '../../model'

export type ModalViewModes = 'edit' | 'view' | 'add' ;
export type TaskCompletionStatus = 'All' | 'Done' | 'Pending';

export type UIState = {
  readonly selectedGroupId: string | null ;
  readonly selectedTheme : ThemeName;
  readonly filter: {
    readonly tagIds: ReadonlyArray<string>;
    readonly difficulties : ReadonlyArray<DifficultyTagId> ;
    readonly showTags: boolean ;
    readonly showDifficulty: boolean ;
    readonly completionStatus: TaskCompletionStatus ;
  }
  readonly taskModal: {
    readonly isOpen: boolean;
    readonly mode: ModalViewModes ;
    readonly taskId: string | null ;
  }
  readonly groupModal: {
    readonly isOpen: boolean;
    readonly mode: Exclude<ModalViewModes, 'view'>;
    readonly groupId: string | null ;
  }
}

const initialState : WritableDraft<UIState> = {
  selectedGroupId: PredefinedGroupId.DSA,
  selectedTheme: 'light',
  filter:{
    tagIds: [],
    difficulties: [],
    completionStatus: 'All',
    showTags: false,
    showDifficulty: false
  },
  taskModal: {
    isOpen: false,
    mode: 'edit',
    taskId: null
  },
  groupModal: {
    isOpen: false,
    mode: 'edit',
    groupId: null
  }
}


const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedGroupId(state, action : PayloadAction<string | null> ) {
      state.selectedGroupId = action.payload
    },
    setThemeName(state, action : PayloadAction<ThemeName>){
      state.selectedTheme = action.payload;
    },
    openTaskModal(state, action : PayloadAction<UIState['taskModal']>) {
      state.taskModal = action.payload
    },
    closeTaskModal(state){
      state.taskModal = initialState.taskModal;
    },
    openGroupModal(state, action:  PayloadAction<UIState['groupModal']>) {
      state.groupModal = action.payload
    },
    closeGroupModal(state){
      state.groupModal = initialState.groupModal;
    },
    resetFilters(state){
      state.filter = initialState.filter;
    },
    setDifficultyFilter(state, action : PayloadAction<ReadonlyArray<DifficultyTagId>>){
      state.filter.difficulties = [...action.payload];
    },
    setTagIdsFilter(state, action: PayloadAction<ReadonlyArray<string>>){
      state.filter.tagIds = [...action.payload];
    },
    setShowTagFilter(state, action : PayloadAction<boolean>){
      state.filter.showTags = action.payload;
    },
    setShowDifficultyFilter(state, action : PayloadAction<boolean>){
      state.filter.showDifficulty = action.payload;
    },
    setCompletionStatusFilter(state, action: PayloadAction<TaskCompletionStatus>){
      state.filter.completionStatus = action.payload;
    }
  }
});


export const {
  setSelectedGroupId,
  setThemeName,
  openGroupModal,
  closeGroupModal,
  closeTaskModal,
  openTaskModal,
  resetFilters,
  setDifficultyFilter,
  setTagIdsFilter,
  setShowTagFilter,
  setShowDifficultyFilter,
  setCompletionStatusFilter,
} = uiSlice.actions

export const uiReducer =  uiSlice.reducer ;


