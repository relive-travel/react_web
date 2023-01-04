import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getKakaoInfo,
  getKakaoToken,
  getUserMatchKakaoId,
} from "redux/thunk/userThunk";

import { getCookie } from "lib/utils/data/cookie";

function useKakaoLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);

  const handleGetKakaoUser = async () => {
    if (!userId) {
      const kakaoInfo = await dispatch(getKakaoInfo()).then((response) => {
        return response.payload;
      });
      dispatch(getUserMatchKakaoId({ kakaoId: kakaoInfo.kakaoId }));
    }
  };

  useEffect(() => {
    if (!userId) {
      const refreshToken = getCookie({ name: "authorize-refresh-token" });
      if (refreshToken && refreshToken !== "undefined") {
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
        navigate("/");
      }
    }
  }, [userId]);
}

export default useKakaoLogin;
