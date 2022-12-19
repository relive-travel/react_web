import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "lib/set/filrebase";

export const setAlbum = createAsyncThunk(
  `album/setAlbum`,
  async ({ userId, markerId, title, content, date }) => {
    const data = {
      userId,
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
  const albumCol = doc(db, "albums", id);
  const albumSnapshot = await getDoc(albumCol);

  // if (albumSnapshot.exists())
  const albumId = albumSnapshot.id;
  const albumItem = albumSnapshot.data();
  return {
    id: albumId,
    ...albumItem,
  };
});

export const getAlbumMatchMarkerId = createAsyncThunk(
  `album/getAlbumMatchMarkerId`,
  async ({ markerId }) => {
    const albumCol = collection(db, "albums");
    const MarkerIdQuery = query(albumCol, where("markerId", "==", markerId));
    const querySnapshot = await getDocs(MarkerIdQuery);
    const queryItem = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return queryItem;
  }
);
