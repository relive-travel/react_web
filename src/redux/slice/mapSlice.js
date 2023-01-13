import { createSlice } from "@reduxjs/toolkit";
import { fetchTopoJson } from "redux/thunk/mapThunk";

const initialState = {
  status: "",
  topojson: null,
  region: null,
  option: null,
  text: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapRegion: (state, action) => {
      state.text = [];
      state.region = action.payload;
    },
    setMapOption: (state, action) => {
      state.option = action.payload;
    },
    setMapText: (state, action) => {
      state.text = [...state.text, action.payload];
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

export const { setMapRegion, setMapOption, setMapText } = mapSlice.actions;

export default mapSlice.reducer;
