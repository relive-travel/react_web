import S3Image from "../S3Image";

function SliderEmpty() {
  return (
    <section className="slider-exception">
      <S3Image folder={"toshimee"} file={"empty.png"} />
      <main>아직 추억이 남아있지 않아요...!</main>
      <footer>
        <button className="make-memory-button">추억 만들러 가기 🥕</button>
      </footer>
    </section>
  );
}

export default SliderEmpty;
