import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTopoJson = createAsyncThunk(
  `map/fetchTopoJson`,
  async ({ region }) => {
    if (region) {
      const res = await fetch(
        `https://relivetravle.s3.ap-northeast-2.amazonaws.com/topojson/${region}.json`
      );
      return res.json();
    }
  }
);

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
      console.log(action.payload);
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
