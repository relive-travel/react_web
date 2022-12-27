import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "lib/set/filrebase";

import axios from "axios";

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

export const getKakao = createAsyncThunk(
  `user/getKakao`,
  async ({ url, params }) => {
    // const kakaoRes = await axios.post(url, null, {
    //   params,
    //   headers: {
    //     "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //   },
    // });
    // console.log(kakaoRes);

    let fetchUrl = new URL(url);
    fetchUrl.search = new URLSearchParams(params).toString();
    let fetchParams = {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };
    const kakaoToken = await fetch(fetchUrl, fetchParams).then((response) => {
      return response.json();
    });
    console.log(kakaoToken);
  }
);
