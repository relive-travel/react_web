import { useSelector } from "react-redux";

function Regist() {
  const userNickName = useSelector((state) => state.user.nickName);
  const userEmail = useSelector((state) => state.user.email);

  return (
    <section className="register-component">
      <header>회원 가입 정보</header>
      <main>
        <section className="register-notify">
          정보를 바꾸면 토끼가 알아볼 수 없어요!
        </section>
        <section className="register-buttons">
          <button className="register-rallback-button">돌아 가기</button>
          <button className="register-complete-button">회원 가입</button>
        </section>
      </main>
      <footer>※ 카카오에서 동의된 닉네임, 이메일을 사용합니다</footer>
    </section>
  );
}

export default Regist;
