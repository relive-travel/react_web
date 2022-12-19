import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "lib/set/filrebase";

export const setPhoto = createAsyncThunk(
  `photo/setPhoto`,
  async ({ userId, albumId, name, url }) => {
    const data = {
      userId,
      albumId,
      name,
      url,
    };

    const docRef = await addDoc(collection(db, "photos"), data);
    return docRef.id;
  }
);

export const getPhotoAll = createAsyncThunk(
  `photo/getPhotoAll`,
  async ({ userId }) => {
    const photoCol = collection(db, "photos");
    const photoQuery = query(photoCol, where(""));
  }
);

export const getPhotoMatchAlbumId = createAsyncThunk(
  `photo/getPhotoMatchAlbumId`,
  async ({ albumId }) => {
    const photoCol = collection(db, "photos");
    const photoQuery = query(photoCol, where("albumId", "==", albumId));
    const querySnapshot = await getDocs(photoQuery);
    const queryItem = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return queryItem;
  }
);
