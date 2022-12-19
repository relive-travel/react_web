import { createSlice } from "@reduxjs/toolkit";
import { getPhotoAll } from "redux/thunk/photoThunk";

const initialState = {
  file: null, //drag and drop comp에서 input file데이터
  data: null, //drag and drop comp에서 input file의 exif데이터
  all: null, //album all comp에서 사용될 모든 데이터
  gather: null, //album gather comp에서 사용될 병합 데이터
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setPhotoFile: (state, action) => {
      state.file = action.payload;
    },
    setPhotoData: (state, action) => {
      state.data = action.payload;
    },
    setPhotoDelete: (state, action) => {
      state.file = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotoAll.fulfilled, (state, action) => {
      state.all = action.payload;
    });
  },
});

export const { setPhotoFile, setPhotoData, setPhotoDelete } =
  photoSlice.actions;

export default photoSlice.reducer;
