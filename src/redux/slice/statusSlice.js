import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialog: {
    create: false,
  },
  modal: {
    select: false,
    change: false,
    inspection: false,
    preview: false,
  },
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setAlbumCreateDialog: (state, action) => {
      state.dialog.create = action.payload;
    },
    setAlbumSelectModal: (state, action) => {
      state.modal.select = action.payload;
    },
    setAlbumChangeModal: (state, action) => {
      state.modal.change = action.payload;
    },
    setAlbumInspectionModal: (state, action) => {
      state.modal.inspection = action.payload;
    },
    setAlbumPreviewModal: (state, action) => {
      state.modal.preview = action.payload;
    },
  },
});

export const {
  setAlbumCreateDialog,
  setAlbumSelectModal,
  setAlbumChangeModal,
  setAlbumInspectionModal,
  setAlbumPreviewModal,
} = statusSlice.actions;

export default statusSlice.reducer;
