import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  getKakaoInfo,
  getKakaoToken,
  getUserMatchKakaoId,
} from "redux/thunk/userThunk";

import { getCookie } from "lib/utils/data/cookie";

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
      const url = "https://kauth.kakao.com/oauth/token";
      const params = {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API,
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
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
      if (refreshToken && accessToken !== "undefined") {
        const url = "https://kauth.kakao.com/oauth/token";
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
    // codeReview
    return () => window.Kakao.Auth.setAccessToken(null);
  }, []);

  return (
    <section className="home-component">
      <header>
        <img
          src={`${process.env.REACT_APP_API_S3_ADDRESS}/image/Logo.png`}
          alt="relive travel, 여행을 기록하다"
        />
      </header>
      <main className="home-main">
        <Outlet />
      </main>
      <footer>
        {["left", "middle", "right"].map((rabbit, index) => {
          return (
            <article className={`${rabbit}-rabbit`} key={`rabbit-${index}`}>
              <img
                src={`${process.env.REACT_APP_API_S3_ADDRESS}/image/${rabbit}_rabbit.png`}
                alt={`${rabbit}을(를) 바라보는 토끼`}
              />
            </article>
          );
        })}
      </footer>
    </section>
  );
}
export default Home;
