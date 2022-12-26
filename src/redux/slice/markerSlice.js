import { createSlice } from "@reduxjs/toolkit";
import { getMarkerAll, getMarkerMatchRegion } from "redux/thunk/markerThunk";

const initialState = {
  default: {
    width: 15,
    height: 10,
  },
  option: {
    url: `${process.env.REACT_APP_API_S3_ADDRESS}/image/left_rabbit.png`,
    width: 15,
    height: 10,
  },
  data: null,
  slider: {
    time: null,
    region: null,
  },
};

const markerSlice = createSlice({
  name: "marker",
  initialState,
  reducers: {
    setMarkerData: (state, action) => {
      state.data = action.payload;
    },
    setMarkerOption: (state, action) => {
      state.option.width =
        state.default.width -
        state.default.width * ((action.payload - 1) / 100);
      state.option.height =
        state.default.height -
        state.default.height * ((action.payload - 1) / 100);
    },
    setMarkerSlider: (state, action) => {
      state.slider[action.payload.type] = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarkerMatchRegion.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getMarkerAll.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { setMarkerData, setMarkerOption, setMarkerSlider } =
  markerSlice.actions;

export default markerSlice.reducer;
