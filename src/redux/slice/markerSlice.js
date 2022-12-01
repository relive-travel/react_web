import { createSlice } from "@reduxjs/toolkit";
import { getMarkerAll, getMarkerMatchRegion } from "redux/thunk/markerThunk";

const initialState = {
  option: {
    url: `${process.env.REACT_APP_API_S3_ADDRESS}/image/left_rabbit.png`,
    width: 15,
    height: 10,
  },
  sliderList: null,
  status: null,
};

const markerSlice = createSlice({
  name: "marker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMarkerMatchRegion.fulfilled, (state, action) => {
        state.status = "getMatchRegion";
        state.sliderList = action.payload;
      })
      .addCase(getMarkerAll.fulfilled, (state, action) => {
        state.status = "getAll";
        state.sliderList = action.payload;
      });
  },
});

export default markerSlice.reducer;
