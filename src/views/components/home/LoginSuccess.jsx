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
        <article className="success-user">{userNickName} !</article>
        <img
          src={`${process.env.REACT_APP_S3_ADDRESS}/image/toshimee/hi.png`}
        />
        <article className="success-content">
          오늘도 기억이 많이 남은 하루야?!
        </article>
      </header>
      <main className="success-start-button" onClick={handleClickStart}>
        <img
          src={`${process.env.REACT_APP_S3_ADDRESS}/image/kakao/success_medium_wide.png`}
        />
        <span className="highlight-none">시작하기</span>
      </main>
    </section>
  );
}

export default LoginSuccess;
