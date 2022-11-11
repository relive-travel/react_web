import { createSlice } from "@reduxjs/toolkit";
import { fetchTopoJson } from "redux/thunk/mapThunk";

const initialState = {
  status: "",
  topojson: null,
  region: null,
  option: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapOption: (state, action) => {
      state.option = action.payload;
    },
    setMapRegion: (state, action) => {
      state.region = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopoJson.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTopoJson.fulfilled, (state, action) => {
        state.topojson = action.payload;
      });
  },
});

export const { setMapOption, setMapRegion } = mapSlice.actions;

export default mapSlice.reducer;
