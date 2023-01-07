import S3Image from "views/components/addition/S3Image";

function AlbumSelectInfo() {
  return (
    <section className="notify-select-information">
      <main>
        <article>
          <span className="main-color">추억</span> 만들러 온거야?~!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"select.png"} />
    </section>
  );
}

export default AlbumSelectInfo;
