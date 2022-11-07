// 사진만 보고싶은 경우에 해당함
// 사진은 시간순/지역순으로 설정됨
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPhotoList = createAsyncThunk(
  `photo/fetchPhotoList`,
  async ({}) => {
    return;
  }
);

const initialState = {};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
});

export const {} = photoSlice.actions;

export default photoSlice.reducer;
