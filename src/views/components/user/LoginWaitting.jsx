function LoginWaitting() {
  // cookie에 access/refresh-token이 존재하지 않는 경우
  // login버튼을 통해 authorize실행, 토큰 발급진행
  const handleClickLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    });
  };

  return (
    <section className="login-waitting-component">
      <header>당신의 추억을 남겨주세요</header>
    </section>
  );
}

export default LoginWaitting;
