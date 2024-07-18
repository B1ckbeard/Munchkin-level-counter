import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countersReducer from './countersSlice';
import modalReducer from './modalSlice';
import settingsReducer from './settingsSlice';

const reducer = combineReducers({
  counters: countersReducer,
  modals: modalReducer,
  settings: settingsReducer
});

export default configureStore({
  reducer,
});
