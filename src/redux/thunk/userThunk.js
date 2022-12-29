import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "lib/set/filrebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import axios from "axios";

import { setCookie } from "lib/utils/cookie";

export const setUser = createAsyncThunk(
  `user/setUser`,
  async ({ kakaoId, nickName, email }) => {
    // 문서를 생성하는 경우, 문서의 id를 지정하려면, setDoc
    // cloud firestore가 자동으로 id를 생성하는 경우, addDoc'
    const docRef = await addDoc(collection(db, "users"), {
      kakaoId,
      nickName,
      email,
    });

    return docRef.id;
  }
);

export const getUserMatchKakaoId = createAsyncThunk(
  `user/getUserMatchKakaoId`,
  async ({ kakaoId }) => {
    const userCol = collection(db, "users");
    const kakaoIdQuery = query(userCol, where("kakaoId", "==", kakaoId));
    const querySnapshot = await getDocs(kakaoIdQuery);
    const queryItem = querySnapshot.docs[0].id;
    return queryItem;
  }
);

export const getKakaoToken = createAsyncThunk(
  `user/getKakaoToken`,
  async ({ url, params }) => {
    // const kakaoRes = await axios.post(url, null, {
    //   params,
    //   headers: {
    //     "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //   },
    // });
    // return kakaoRes.data;

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
    setCookie({
      name: "authorize-access-token",
      value: kakaoToken.access_token,
      expires: kakaoToken.expires_in,
    });
    // refresh-token 값은 요청 시 만료기간이 1개월 미만으로 남았을 때만 갱신되어 전달됨
    if (kakaoToken.refresh_token) {
      setCookie({
        name: "authorize-refresh-token",
        value: kakaoToken.refresh_token,
        expires: kakaoToken.refresh_token_expires_in,
      });
    }
    window.Kakao.Auth.setAccessToken(kakaoToken.access_token);
  }
);

export const getKakaoInfo = createAsyncThunk(`user/getKakaoInfo`, async () => {
  const kakaoInfo = await window.Kakao.API.request({ url: "/v2/user/me" });

  // if (!kakaoInfo.is_email_valid || !kakaoInfo.is_email_verified) return

  return {
    kakaoId: kakaoInfo.id,
    nickName: kakaoInfo.kakao_account.profile.nickname,
    email: kakaoInfo.kakao_account.email,
  };
});
