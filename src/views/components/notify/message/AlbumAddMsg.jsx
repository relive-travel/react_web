import S3Image from "views/components/addition/S3Image";

function AlbumAddMsg() {
  return (
    <section className="notify-album-add-message">
      <main>
        <article>
          여기! <span className="highlight">사진</span> 넣어줘!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"here.png"} />
    </section>
  );
}
export default AlbumAddMsg;
