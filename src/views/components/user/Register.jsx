import { useSelector } from "react-redux";

function Register() {
  const userNickName = useSelector((state) => state.user.nickName);
  const userEmail = useSelector((state) => state.user.email);

  return (
    <section className="register">
      <header>정보를 바꾸면 토끼가 알아볼 수 없어요!</header>
      <footer>※ 카카오에서 동의된 닉네임, 이메일을 사용합니다</footer>
    </section>
  );
}

export default Register;
