import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const settingsAdapter = createEntityAdapter();
const initialState = settingsAdapter.getInitialState({
  maxLevel: 10,
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeMaxLevel: (state, {payload}) => {
      state.maxLevel = payload;
    },
  },
});

export const selectMaxLevel = (state) => state.settings.maxLevel;
export const { actions } = settingsSlice;
export default settingsSlice.reducer;
