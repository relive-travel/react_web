import { createSlice } from "@reduxjs/toolkit";
import { getMarkerAll, getMarkerAllMatchRegion } from "redux/thunk/markerThunk";

const initialState = {
  default: {
    width: 27,
    height: 33,
  },
  option: {
    url: `${process.env.REACT_APP_S3_ADDRESS}/image/assets/pin.png`,
    width: 27,
    height: 33,
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
        action.payload == 1
          ? 27
          : state.default.width -
            state.default.width * ((action.payload - 1) / 100);
      state.option.height =
        action.payload == 1
          ? 33
          : state.default.height -
            state.default.height * ((action.payload - 1) / 100);
    },
    setMarkerSlider: (state, action) => {
      state.slider[action.payload.type] = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarkerAllMatchRegion.fulfilled, (state, action) => {
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
