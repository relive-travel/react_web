import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "lib/setFilrebase";

export const setAlbum = createAsyncThunk(
  `album/setAlbum`,
  async ({ id, title, content, date }) => {
    const data = {
      marker_id: id,
      title,
      content,
      date,
    };

    const docRef = await addDoc(collection(db, "albums"), data);
    return docRef.id;
  }
);

export const getAlbumOne = createAsyncThunk(
  `album/getAlbumOne`,
  async ({ id }) => {
    const albumCol = collection(db, "albums", id);
    const albumSnapshot = await getDocs(albumCol);

    if (albumSnapshot.exists()) {
      const album = albumSnapshot.docs.map((doc) => doc.data());
      return album;
    }
    return null;
  }
);

export const getAlbumAll = createAsyncThunk(`album/getAlbumAll`, async () => {
  const albumCol = collection(db, "albums");
  const albumSnapshot = await getDocs(albumCol);

  if (albumSnapshot.exists()) {
    const albumList = albumSnapshot.docs.map((doc) => doc.data());
    return albumList;
  }
  return null;
});
