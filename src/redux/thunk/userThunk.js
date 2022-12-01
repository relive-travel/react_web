import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "lib/setFilrebase";

export const setUser = createAsyncThunk(`user/setUser`, async (data) => {
  // 문서를 생성하는 경우, 문서의 id를 지정하려면, setDoc
  // cloud firestore가 자동으로 id를 생성하는 경우, addDoc'
  const docRef = await addDoc(collection(db, "users"), data);
});

export const getUser = createAsyncThunk(`user/getUser`, async ({ email }) => {
  const userCol = collection(db, "users");
  const emailQuery = query(userCol, where("email", "==", email));
  const querySnapshot = await getDocs(emailQuery);
  const queryItem = querySnapshot.docs[0].id;
  return queryItem;
});
