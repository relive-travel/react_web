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
    setPhotoDelete: (state, action) => {
      state.file = null;
      state.data = null;
    },
  },
});

export const { setPhotoFile, setPhotoData, setPhotoDelete } =
  photoSlice.actions;

export default photoSlice.reducer;
