import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialog: {
    auto: false,
    create: false,
    keyword: false,
    location: false,
    roadAddr: false,
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
    setAlbumAuto: (state, action) => {
      state.dialog.auto = action.payload;
    },
    setAlbumCreateDialog: (state, action) => {
      state.dialog.create = action.payload;
    },
    setAlbumHandKeywordDialog: (state, action) => {
      state.dialog.keyword = action.payload;
    },
    setAlbumHandLocationDialog: (state, action) => {
      state.dialog.location = action.payload;
    },
    setAlbumHandRoadAddrDialog: (state, action) => {
      state.dialog.roadAddr = action.payload;
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
  setAlbumAuto,
  setAlbumCreateDialog,
  setAlbumHandKeywordDialog,
  setAlbumHandLocationDialog,
  setAlbumHandRoadAddrDialog,
  setAlbumSelectModal,
  setAlbumChangeModal,
  setAlbumInspectionModal,
  setAlbumPreviewModal,
} = statusSlice.actions;

export default statusSlice.reducer;
