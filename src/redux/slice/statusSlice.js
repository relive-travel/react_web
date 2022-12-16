import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    auto: false,
    mapText: false,
  },
  dialog: {
    create: false,
    keyword: false,
    location: false,
    roadAddr: false,
    view: false,
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
    /** value */
    setAlbumAuto: (state, action) => {
      state.value.auto = action.payload;
    },
    setMapTextValue: (state, action) => {
      state.value.mapText = action.payload;
    },
    /** dialog */
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
    setAlbumViewDialog: (state, action) => {
      state.dialog.view = action.payload;
    },
    /** modal */
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
  /** value */
  setAlbumAuto,
  setMapTextValue,
  /** dialog */
  setAlbumCreateDialog,
  setAlbumHandKeywordDialog,
  setAlbumHandLocationDialog,
  setAlbumHandRoadAddrDialog,
  setAlbumViewDialog,
  /** modal */
  setAlbumSelectModal,
  setAlbumChangeModal,
  setAlbumInspectionModal,
  setAlbumPreviewModal,
} = statusSlice.actions;

export default statusSlice.reducer;
