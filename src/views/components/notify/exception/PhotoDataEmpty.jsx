import S3Image from "views/components/addition/S3Image";

function PhotoDataEmpty() {
  return (
    <section className="photo-data-exception">
      <main>
        <article>
          이런! 사진에 <span className="text-highlight-main-color">데이터</span>
          가 없어요...!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"empty.png"} />
    </section>
  );
}
export default PhotoDataEmpty;
