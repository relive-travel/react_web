import { createAsyncThunk } from "@reduxjs/toolkit";

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
