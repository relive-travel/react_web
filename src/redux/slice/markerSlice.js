import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMarkerMatchRegion } from "redux/thunk/markerThunk";

const initialState = {
  option: {
    url: "https://relivetravle.s3.ap-northeast-2.amazonaws.com/image/left_rabbit.png",
    width: 15,
    height: 10,
  },
  list: null,
};

const markerSlice = createSlice({
  name: "marker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMarkerMatchRegion.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default markerSlice.reducer;
