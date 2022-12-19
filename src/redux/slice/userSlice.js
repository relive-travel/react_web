import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "ZhEzfwLkBX2nFh8Lvhfn",
  email: "arisu0906@naver.com",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail } = userSlice.actions;

export default userSlice.reducer;
