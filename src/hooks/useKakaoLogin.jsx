import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getKakaoInfo,
  getKakaoToken,
  getUserMatchKakaoId,
} from "redux/thunk/userThunk";

import { setNotifyUserEmpty } from "redux/slice/statusSlice";

import { getCookie } from "lib/utils/jsUtils";

function useKakaoLogin() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);

  const handleGetKakaoUser = async () => {
    const kakaoInfo = await dispatch(getKakaoInfo()).then((response) => {
      return response.payload;
    });
    dispatch(getUserMatchKakaoId({ kakaoId: kakaoInfo.kakaoId }));
  };

  useEffect(() => {
    if (!userId) {
      const refreshToken = getCookie({ name: "authorize-refresh-token" });
      if (
        refreshToken &&
        refreshToken !== "undefined" &&
        window.Kakao.Auth.getAccessToken()
      ) {
        const url = process.env.REACT_APP_KAKAO_TOKEN_URL;
        const params = {
          grant_type: "refresh_token",
          client_id: process.env.REACT_APP_KAKAO_REST_API,
          refresh_token: refreshToken,
        };
        dispatch(getKakaoToken({ url, params })).then(() => {
          handleGetKakaoUser();
        });
      } else {
        dispatch(setNotifyUserEmpty(true));
      }
    }
  }, [userId]);
}

export default useKakaoLogin;
