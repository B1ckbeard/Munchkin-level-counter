import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const modalAdapter = createEntityAdapter();
const initialState = modalAdapter.getInitialState({
  isOpened: false,
  modalType: null,
  data: null,
});

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true;
      state.modalType = payload.modalType;
      state.data = payload.data;
    },
    closeModal: (state) => {
      state.isOpened = false;
    },
  },
});

export const selectors = modalAdapter.getSelectors((state) => state.modal);
export const { actions } = modalSlice;
export default modalSlice.reducer;
