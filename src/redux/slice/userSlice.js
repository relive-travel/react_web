import { createSlice } from "@reduxjs/toolkit";
import { getKakaoInfo, getUser } from "redux/thunk/userThunk";

const initialState = {
  id: null,
  nickName: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.id = action.payload;
      })
      .addCase(getKakaoInfo.fulfilled, (state, action) => {
        state.nickName = action.payload.nickName;
        state.email = action.payload.email;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
