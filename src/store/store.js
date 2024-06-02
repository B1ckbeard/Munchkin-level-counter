import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countersReducer from './countersSlice';
import modalReducer from './modalSlice';

const reducer = combineReducers({
  counters: countersReducer,
  modals: modalReducer,
});

export default configureStore({
  reducer,
});
