import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTopoJson = createAsyncThunk(
  `map/fetchTopoJson`,
  async ({ region }) => {
    const res = await fetch(
      `https://relivetravle.s3.ap-northeast-2.amazonaws.com/${region}.json`
    );
    return res.json();
  }
);

const initialState = {
  status: "",
  topojson: null,
  option: {
    width: 960,
    height: 640,
    region: "seoul",
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapOption: (state, action) => {
      console.log(action.payload);
      state.option.width = action.payload.width;
      state.option.height = action.payload.height;
      state.option.region = action.payload.region;
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

export const { setMapOption } = mapSlice.actions;

export default mapSlice.reducer;
