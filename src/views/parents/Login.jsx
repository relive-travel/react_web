import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { getKakao } from "redux/thunk/userThunk";

import "./Login.scss";
function Login(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClickLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    });
  };

  const handleClickInfo = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.API.request({ url: "/v2/user/me" })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClickLogout = () => {
    window.Kakao.API.request({ url: "/v1/user/unlink" })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    return () => window.Kakao.Auth.setAccessToken(null);
  }, []);

  useEffect(() => {
    console.log(location.state);
    if (location.state?.code) {
      const url = "https://kauth.kakao.com/oauth/token";
      const params = {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API,
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
        code: location.state.code,
      };
      dispatch(getKakao({ url, params }));
    }
  }, []);

  return (
    <section className="login-component">
      <button onClick={handleClickLogin}>Login</button>
      <button onClick={handleClickInfo}>Info</button>
      <button onClick={handleClickLogout}>Logout</button>
    </section>
  );
}
export default Login;
