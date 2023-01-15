import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  getAccessTokenInfo,
  getKakaoInfo,
  getKakaoToken,
  getUserMatchKakaoId,
} from "redux/thunk/userThunk";

import { delCookie, getCookie } from "lib/utils/jsUtils";

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

  const handleValidAccessToken = async ({ access_token }) => {
    const tokenInfo = await dispatch(
      getAccessTokenInfo({
        access_token: access_token,
      })
    ).then((response) => {
      return response.payload;
    });
    return tokenInfo.id ? true : false;
  };

  // authorize를 통해 발급된 인가코드로 카카오 사용자 accessToken을 발급한다.
  useEffect(() => {
    if (location.state?.code) {
      const url = process.env.REACT_APP_KAKAO_TOKEN_URL;
      const params = {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API,
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
        code: location.state.code,
      };
      dispatch(getKakaoToken({ url, params })).then(() => {
        handleGetKakaoUser();
      });
    } else {
      if (window.Kakao.Auth.getAccessToken()) {
        handleValidAccessToken({
          access_token: window.Kakao.Auth.getAccessToken(),
        }).then((response) => {
          // 엑세스 토큰이 존재하고 유호한 상태이므로 카카오 유저정보를 불러온다.
          if (response) {
            handleGetKakaoUser();
          } else {
            // 엑세스 토큰이 존재하나 유효하지 않으므로
            // 엑세스 토큰을 제거하고 login창으로 보낸다
            window.Kakao.Auth.setAccessToken(null);
            navigate("/login");
          }
        });
      } else {
        const accessToken = getCookie({ name: "authorize-access-token" });
        if (accessToken && accessToken != "undefined") {
          handleValidAccessToken({ access_token: accessToken }).then(
            (response) => {
              // 쿠키의 엑세스 토큰이 유효하므로 엑세스 토큰을 등록하고 유저정보를 가져온다
              if (response) {
                window.Kakao.Auth.setAccessToken(accessToken);
                handleGetKakaoUser();
              } else {
                // 엑세스 토큰이 쿠키에 있으나 정확하지 않은 값이므로
                // 엑세스 토큰을 쿠키에서 제거하고 login창으로 보낸다
                delCookie({ name: "authorize-access-token" });
                navigate("/login");
              }
            }
          );
        } else {
          navigate("/login");
        }
      }
    }
  }, [location.state?.code]);

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
