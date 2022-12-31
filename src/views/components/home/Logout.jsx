import { delCookie } from "lib/utils/data/cookie";

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
  return (
    <button className="logout-button" onClick={handleClickLogout}>
      로그아웃
    </button>
  );
}

export default Logout;
