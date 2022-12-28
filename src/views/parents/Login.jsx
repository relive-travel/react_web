import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getKakaoInfo, getKakaoToken, getUser } from "redux/thunk/userThunk";

import { getCookie } from "lib/utils/cookie";

import LoginWaitting from "views/components/user/LoginWaitting";
import LoginSuccess from "views/components/user/LoginSuccess";
import Register from "views/components/user/Register";

import "./Login.scss";
function Login(props) {
  const location = useLocation();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const userEmail = useSelector((state) => state.user.email);

  useEffect(() => {
    if (userEmail) {
      dispatch(getUser({ email: userEmail }));
    }
  }, [userEmail]);

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
      dispatch(getKakaoToken({ url, params }));
    }
  }, [location.state?.code]);

  // cookie에 access-token이 존재하는 경우 access-token등록
  useEffect(() => {
    const accessToken = getCookie({ name: "authorize-access-token" });
    if (accessToken) {
      window.Kakao.Auth.setAccessToken(accessToken);
      // access-token으로 사용자 정보를 가져온다.
      dispatch(getKakaoInfo());
    } else {
      // cookie에 access-token은 없으나
      // refresh-token이 존재하는 경우 access-token 재 발급 후 사용자 정보 불러오기
      const refreshToken = getCookie({ name: "authorize-refresh-token" });
      if (refreshToken) {
        const url = "https://kauth.kakao.com/oauth/token";
        const params = {
          grant_type: "refresh_token",
          client_id: process.env.REACT_APP_KAKAO_REST_API,
          refresh_token: refreshToken,
        };
        dispatch(getKakaoToken({ url, params }));
      }
    }
    // codeReview
    return () => window.Kakao.Auth.setAccessToken(null);
  }, []);

  return (
    <section className="login-component">
      <header>여기는 Relive-travel의 마크가 들어갈 곳이에요</header>
      <main className="login-main">
        {userEmail ? (
          userId ? (
            <LoginSuccess />
          ) : (
            <Register />
          )
        ) : (
          <LoginWaitting />
        )}
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
export default Login;
