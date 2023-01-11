import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  getKakaoInfo,
  getKakaoToken,
  getUserMatchKakaoId,
} from "redux/thunk/userThunk";

import { getCookie } from "lib/utils/data/cookie";

import S3Image from "views/components/addition/S3Image";

import "./Home.scss";
function Home(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleGetKakaoUser = async () => {
    const kakaoInfo = await dispatch(getKakaoInfo()).then((response) => {
      return response.payload;
    });
    const userInfo = await dispatch(
      getUserMatchKakaoId({ kakaoId: kakaoInfo.kakaoId })
    ).then((response) => {
      return response.payload;
    });
    navigate(userInfo ? "/success" : "/regist");
  };

  // authorize를 통해 발급된 인가코드로 카카오 사용자 accessToken을 발급한다.
  useEffect(() => {
    if (location.state?.code) {
      const url = process.env.REACT_APP_KAKAO_TOKEN_URL;
      const params = {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API,
        redirect_uri:
          process.env.REACT_APP_ENV == "production"
            ? process.env.REACT_APP_KAKAO_REDIRECT_URI_PRODUCT
            : process.env.REACT_APP_KAKAO_REDIRECT_URI_LOCAL,
        code: location.state.code,
      };
      dispatch(getKakaoToken({ url, params })).then(() => {
        handleGetKakaoUser();
      });
    }
  }, [location.state?.code]);

  // cookie에 access-token이 존재하는 경우 access-token등록
  useEffect(() => {
    const accessToken = getCookie({ name: "authorize-access-token" });
    if (accessToken && accessToken !== "undefined") {
      window.Kakao.Auth.setAccessToken(accessToken);
      // access-token으로 사용자 정보를 가져온다.
      handleGetKakaoUser();
    } else {
      // cookie에 access-token은 없으나
      // refresh-token이 존재하는 경우 access-token 재 발급 후 사용자 정보 불러오기
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
        navigate("/login");
      }
    }
  }, []);

  return (
    <section className="home-component">
      <header>
        <img
          src={`${process.env.REACT_APP_S3_ADDRESS}/image/assets/logo.png`}
          alt="relive travel, 여행을 기록하다"
        />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <article className="welcome-imgs">
          <S3Image folder={"toshimee"} file={"hello_right.png"} />
          <S3Image folder={"toshimee"} file={"hello_left.png"} />
        </article>
      </footer>
    </section>
  );
}
export default Home;
