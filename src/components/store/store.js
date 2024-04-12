import { combineReducers, configureStore } from '@reduxjs/toolkit';

import countersReducer from './countersSlice';

const reducer = combineReducers({
  counters: countersReducer,
});

export default configureStore({
  reducer,
});
