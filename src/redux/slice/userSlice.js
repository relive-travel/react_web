import { createSlice } from "@reduxjs/toolkit";
import {
  setUser,
  getKakaoInfo,
  getUserMatchKakaoId,
} from "redux/thunk/userThunk";

const initialState = {
  id: null,
  kakaoId: null,
  nickName: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUser.fulfilled, (state, action) => {
        state.id = action.payload;
      })
      .addCase(getUserMatchKakaoId.fulfilled, (state, action) => {
        state.id = action.payload;
      })
      .addCase(getKakaoInfo.fulfilled, (state, action) => {
        state.kakaoId = action.payload.kakaoId;
        state.nickName = action.payload.nickName;
        state.email = action.payload.email;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
