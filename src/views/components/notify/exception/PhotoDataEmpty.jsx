import S3Image from "views/components/addition/S3Image";

function PhotoDataEmpty() {
  return (
    <section className="notify-photo-data-empty-exception">
      <main>
        <article>
          이런! <span className="highlight">사진</span>에&nbsp;
          <span className="highlight">데이터</span>가 없어요...!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"empty.png"} />
    </section>
  );
}
export default PhotoDataEmpty;
