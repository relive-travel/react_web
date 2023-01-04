import S3Image from "views/components/addition/S3Image";

function UserInfoEmpty() {
  return (
    <section className="user-info-empty-exception">
      <main>
        아이쿠...! 사용자님의 정보가 없어요..! 다시 로그인 해주세요...!
      </main>
      <S3Image folder={"toshimee"} file={"sullen.png"} />
    </section>
  );
}

export default UserInfoEmpty;
