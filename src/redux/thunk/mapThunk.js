import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopoJson = createAsyncThunk(
  `map/fetchTopoJson`,
  async ({ region }) => {
    if (region) {
      const res = await fetch(
        `${process.env.REACT_APP_S3_ADDRESS}/topojson/${region}.json`
      );
      return res.json();
    }
  }
);
