// 앨범을 모아서 보고싶은 경우 해당됨
// 앨범은 시간순/지역순으로 나눠서 볼 수 있음
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //앨범을 만드는곳
  search: null, // 검색한 앨범의 주소
  //앨범을 보여주는곳
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setAlbumSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setAlbumSearch } = albumSlice.actions;

export default albumSlice.reducer;
