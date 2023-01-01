import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginSuccess() {
  const navigate = useNavigate();
  const userNickName = useSelector((state) => state.user.nickName);

  const handleClickStart = () => {
    navigate("/map");
  };

  return (
    <section className="login-success-component">
      <header>
        <p className="success-user">{userNickName} !</p>
        <img
          src={`${process.env.REACT_APP_API_S3_ADDRESS}/image/toshimee/hi.png`}
        />
        <p className="success-welcome">오늘도 기억에 많이 남은 하루야?!</p>
      </header>
      <main onClick={handleClickStart}>
        <img
          src={`${process.env.REACT_APP_API_S3_ADDRESS}/image/kakao/success_medium_wide.png`}
        />
        <span>시작하기</span>
      </main>
    </section>
  );
}

export default LoginSuccess;
