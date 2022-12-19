import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "ZhEzfwLkBX2nFh8Lvhfn",
  email: "arisu0906@naver.com",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
