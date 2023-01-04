import S3Image from "views/components/addition/S3Image";

function AlbumCreateComplete() {
  return (
    <section className="album-create-complete">
      <main>
        예~!&npbs;<span>추억</span>이 만들어 졌어요!
      </main>
      <S3Image floder={"toshimee"} file={"hooray.png"} />
    </section>
  );
}

export default AlbumCreateComplete;
