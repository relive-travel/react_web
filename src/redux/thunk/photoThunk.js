import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "lib/setFilrebase";

export const setPhoto = createAsyncThunk(`photo/setPhoto`, async () => {});
