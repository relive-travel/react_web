import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";

import { db } from "lib/setFilrebase";

export const setPhoto = createAsyncThunk(
  `photo/setPhoto`,
  async ({ id, name, url, width, height }) => {
    const data = {
      album_id: id,
      name,
      url,
      width,
      height,
    };

    const docRef = await addDoc(collection(db, "photos"), data);
    return docRef.id;
  }
);
