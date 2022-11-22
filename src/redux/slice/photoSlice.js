import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: null,
  data: null,
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
  },
});

export const { setPhotoFile, setPhotoData } = photoSlice.actions;

export default photoSlice.reducer;
