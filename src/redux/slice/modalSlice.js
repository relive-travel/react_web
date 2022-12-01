import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inspection: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setInspectionModal: (state, action) => {
      state.inspection = action.payload;
    },
  },
});

export const { setInspectionModal } = modalSlice.actions;

export default modalSlice.reducer;
