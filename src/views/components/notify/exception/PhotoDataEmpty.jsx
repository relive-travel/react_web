import S3Image from "../addition/S3Image";

function PhotoDataEmpty() {
  return (
    <section className="photo-data-exception">
      <main>
        이런! 사진에 <span>데이터</span>가 없어요...!
      </main>
      <S3Image folder={"toshimee"} file={"empty.png"} />
    </section>
  );
}
export default PhotoDataEmpty;
