import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: {
    url: "https://relivetravle.s3.ap-northeast-2.amazonaws.com/image/left_rabbit.png",
    width: 45,
    height: 20,
  },
  point: [
    {
      lat: 37.50879971854291,
      long: 127.06052701159585,
    },
    {
      lat: 37.50317037741282,
      long: 127.00346068873588,
    },
    {
      lat: 37.563410116935,
      long: 126.982886367076,
    },
  ],
};

const markerSlice = createSlice({
  name: "marker",
  initialState,
  reducers: {
    setMarkerOption: (state, action) => {
      state.option = action.payload;
    },
    setMarkerPoint: (state, action) => {
      state.point = action.payload;
    },
  },
});

export const { setMarkerOption, setMarkerPoint } = markerSlice.actions;

export default markerSlice.reducer;
