import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: null,
  fileList: null,
  data: null, // {}
  dataList: null, // []
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setPhotoFile: (state, action) => {
      console.log(action);
      console.log(action.payload);
      state.file = action.payload;
    },
    setPhotoFileList: (state, action) => {
      state.fileList = action.payload;
    },
    setPhotoData: (state, action) => {
      state.data = action.payload;
    },
    setPhotoDataList: (state, action) => {
      state.dataList = action.payload;
    },
  },
});

export const {
  setPhotoFile,
  setPhotoFileList,
  setPhotoData,
  setPhotoDataList,
} = photoSlice.actions;

export default photoSlice.reducer;
