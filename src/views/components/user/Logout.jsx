import { delCookie } from "lib/utils/cookie";

function Logout() {
  const handleClickLogout = () => {
    window.Kakao.API.request({ url: "/v1/user/unlink" })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    delCookie({ name: "authorize-access-token" });
    window.Kakao.Auth.setAccessToken(null);
  };
  return <></>;
}

export default Logout;
