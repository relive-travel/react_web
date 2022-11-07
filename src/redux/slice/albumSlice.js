// 앨범을 모아서 보고싶은 경우 해당됨
// 앨범은 시간순/지역순으로 나눠서 볼 수 있음

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAlbumList = createAsyncThunk(
  `album/fetchAlbumList`,
  async ({}) => {
    return;
  }
);

const initialState = {};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
});

export const {} = albumSlice.actions;

export default albumSlice.reducer;
