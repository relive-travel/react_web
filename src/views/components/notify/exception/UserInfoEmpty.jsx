import S3Image from "views/components/addition/S3Image";

function UserInfoEmpty() {
  return (
    <section className="notify-user-info-empty-exception">
      <main>
        <article>
          아이쿠...! 사용자님의 <span className="highlight">정보</span>가&nbsp;
          없어요..!
        </article>
        <article>
          다시 <span className="highlight">로그인</span> 해주세요...!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"sullen.png"} />
    </section>
  );
}

export default UserInfoEmpty;
