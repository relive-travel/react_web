import S3Image from "views/components/addition/S3Image";

function UserInfoEmpty() {
  return (
    <section className="user-info-empty-exception">
      <main>
        <article>
          아이쿠...! <span>사용자</span>님의 <span>정보</span>가 없어요..!
        </article>
        <article>
          다시 <span>로그인</span> 해주세요...!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"sullen.png"} />
    </section>
  );
}

export default UserInfoEmpty;
