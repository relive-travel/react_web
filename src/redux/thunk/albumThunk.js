import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import { db } from "lib/set/filrebase";

export const setAlbum = createAsyncThunk(
  `album/setAlbum`,
  async ({ markerId, title, content, date }) => {
    const data = {
      markerId,
      title,
      content,
      date,
    };

    const docRef = await addDoc(collection(db, "albums"), data);
    return docRef.id;
  }
);

export const getAlbum = createAsyncThunk(`album/getAlbum`, async ({ id }) => {
  const albumCol = collection(db, "albums", id);
  const albumSnapshot = await getDocs(albumCol);

  const album = albumSnapshot.docs.map((doc) => doc.data());
  return album;
});

export const getAlbumMatchMarkerId = createAsyncThunk(
  `album/getAlbumMatchMarkerId`,
  async ({ markerId }) => {
    const albumCol = collection(db, "albums");
    const MarkerIdQuery = query(albumCol, where("markerId", "==", markerId));
    const querySnapshot = await getDocs(MarkerIdQuery);
    const queryItem = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return queryItem;
  }
);
