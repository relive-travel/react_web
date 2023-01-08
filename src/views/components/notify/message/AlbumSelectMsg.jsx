import S3Image from "views/components/addition/S3Image";

function AlbumSelectMsg() {
  return (
    <section className="notify-album-select-message">
      <main>
        <article>
          <span className="highlight">추억</span> 만들러 온거야?~!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"select.png"} />
    </section>
  );
}

export default AlbumSelectMsg;
