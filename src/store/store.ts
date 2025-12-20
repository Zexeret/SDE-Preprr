import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasks';
import { tagsReducer } from './tags';
import { groupsReducer } from './groups';
import { uiReducer } from './ui';
import { registerListeners } from './registerListeners';
import { listenerMiddleware } from './listenerMiddleware';

registerListeners();

export const store = configureStore({
  reducer: {
    'tasks': tasksReducer,
    "tags": tagsReducer,
    "groups": groupsReducer,
    "ui": uiReducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
}); 


export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 