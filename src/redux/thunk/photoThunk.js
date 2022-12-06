import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "lib/set/filrebase";

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

export const getPhotoMatchAlbumId = createAsyncThunk(
  `photo/getPhotoMatchAlbumId`,
  async ({ albumId }) => {
    const photoCol = collection(db, "photos");
    const albumQuery = query(photoCol, where("albumId", "==", albumId));
    const querySnapshot = await getDocs(albumQuery);
    const queryItem = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return queryItem;
  }
);
