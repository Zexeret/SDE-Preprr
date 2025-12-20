import { createSlice, type PayloadAction, type WritableDraft } from "@reduxjs/toolkit"; 
import { PredefinedGroupId, type DifficultyTagId } from '../../model'

type ModalViewModes = 'add' | 'edit' | 'view' ;

type UIState = {
  readonly selectedGroupId: string | null ;
  readonly filter: {
    readonly tagIds: ReadonlyArray<string>;
    readonly difficulties : ReadonlyArray<DifficultyTagId> ;
    readonly showTags: boolean ;
    readonly showDifficulty: boolean ;
  }
  readonly taskModal: {
    readonly mode: ModalViewModes ;
    readonly taskId: string | null ;
  }
  readonly groupModal: {
    readonly mode: Exclude<ModalViewModes, 'view'>;
    readonly groupId: string | null ;
  }
}

const initialState : WritableDraft<UIState> = {
  selectedGroupId: PredefinedGroupId.DSA,
  filter:{
    tagIds: [],
    difficulties: [],
    showTags: false,
    showDifficulty: false
  },
  taskModal: {
    mode: 'add',
    taskId: null
  },
  groupModal: {
    mode: 'add',
    groupId: null
  }
}


const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedGroupId(state, action : PayloadAction<string> ) {
      state.selectedGroupId = action.payload
    },
    openTaskModal(state, action : PayloadAction<UIState['taskModal']>) {
      state.taskModal = action.payload
    },
    openGroupModal(state, action:  PayloadAction<UIState['groupModal']>) {
      state.groupModal = action.payload
    },
    resetFilters(state){
      state.filter = initialState.filter;
    }
  }
});


export const {
  setSelectedGroupId,
  openGroupModal,
  openTaskModal,
  resetFilters
} = uiSlice.actions

export const uiReducer =  uiSlice.reducer ;


