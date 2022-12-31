import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "redux/thunk/userThunk";

import { delCookie } from "lib/utils/data/cookie";
import {
  setPhotoUserFolder,
  getPhotoUserFolder,
  copyPhotoUserFolder,
} from "lib/utils/s3Utils";

function Regist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userKakaoId = useSelector((state) => state.user.kakaoId);
  const userNickName = useSelector((state) => state.user.nickName);
  const userEmail = useSelector((state) => state.user.email);

  const handleRallbackClick = () => {
    delCookie({ name: "authorize-access-token" });
    delCookie({ name: "authorize-refresh-token" });
    // navigate("/")
    navigate("/login");
  };

  const handleCompleteClick = async () => {
    // dispatch(
    //   setUser({
    //     kakaoId: userKakaoId,
    //     nickName: userNickName,
    //     email: userEmail,
    //   })
    // );
    // setPhotoUserFolder({ email: userEmail });
    // navigate("/success");
  };

  return (
    <section className="regist-component">
      <header>회원 가입 정보</header>
      <main>
        <header>정보가 바뀌면 토끼가 알아볼 수 없어요!</header>
        <main className="regist-info">
          <article className="regist-nickName">
            닉네임 : <span>{userNickName}</span>
          </article>
          <article className="regist-email">
            이메일 : <span>{userEmail}</span>
          </article>
        </main>
        <footer className="regist-buttons">
          <button
            className="regist-rallback-button"
            onClick={handleRallbackClick}
          >
            돌아 가기
          </button>
          <button
            className="regist-complete-button"
            onClick={handleCompleteClick}
          >
            회원 가입
          </button>
        </footer>
      </main>
      <footer>※ 카카오에서 동의된 닉네임, 이메일을 사용합니다</footer>
    </section>
  );
}

export default Regist;
