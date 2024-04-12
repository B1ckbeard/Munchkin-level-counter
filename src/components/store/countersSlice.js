import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const countersAdapter = createEntityAdapter();
const initialState = countersAdapter.getInitialState({
  counters: [],
});

const countersSlice = createSlice({
  name: 'counters',
  initialState,
  reducers: {
    addCounter: (state, { payload }) => {
      countersAdapter.addOne(state, payload);
    },
    addCounters: countersAdapter.addMany,
    removeCounter: (state, { payload }) => {
      countersAdapter.removeOne(state, payload);
    },
    updateCounter: countersAdapter.updateOne,
  },
});

export const { actions } = countersSlice;
export const selectors = countersAdapter.getSelectors((state) => state.counters);
export default countersSlice.reducer;
