import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";

import { db } from "lib/setFilrebase";

export const setPhoto = createAsyncThunk(
  `photo/setPhoto`,
  async ({ albumId, name, url }) => {
    const data = {
      albumId,
      name,
      url,
    };

    const docRef = await addDoc(collection(db, "photos"), data);
    return docRef.id;
  }
);
