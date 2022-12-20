import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    auto: false,
  },
  option: {
    sort: false,
    gather: false,
    view: false,
  },
  dialog: {
    create: false,
    keyword: false,
    location: false,
    roadAddr: false,
    swiper: false,
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
    /** option */
    setDialSortOption: (state, action) => {
      state.option.sort = action.payload;
    },
    setDialGatherOption: (state, action) => {
      state.option.gather = action.payload;
    },
    setDialViewOption: (state, action) => {
      state.option.view = action.payload;
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
    setAlbumSwiperDialog: (state, action) => {
      state.dialog.swiper = action.payload;
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
  /** option */
  setDialSortOption,
  setDialGatherOption,
  setDialViewOption,
  /** dialog */
  setAlbumCreateDialog,
  setAlbumHandKeywordDialog,
  setAlbumHandLocationDialog,
  setAlbumHandRoadAddrDialog,
  setAlbumSwiperDialog,
  /** modal */
  setAlbumSelectModal,
  setAlbumChangeModal,
  setAlbumInspectionModal,
  setAlbumPreviewModal,
} = statusSlice.actions;

export default statusSlice.reducer;
