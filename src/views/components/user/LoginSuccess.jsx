import { useSelector } from "react-redux";

function LoginSuccess() {
  const userNickName = useSelector((state) => state.user.nickName);

  return (
    <section className="login-success-component">
      <header>오늘하루도 기억에 남으셨나요?</header>
      <main>
        <button className="start-button">시작하기</button>
      </main>
    </section>
  );
}

export default LoginSuccess;
