import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "lib/setFilrebase";

export const setUser = createAsyncThunk(`user/setUser`, async (data) => {
  // 문서를 생성하는 경우, 문서의 id를 지정하려면, setDoc
  // cloud firestore가 자동으로 id를 생성하는 경우, addDoc'
  const docRef = await addDoc(collection(db, "users"), data);
});
