import S3Image from "../addition/S3Image";

function SliderEmpty() {
  return (
    <section className="slider-exception">
      <main>아직 추억이 남아있지 않아요...!</main>
      <S3Image folder={"toshimee"} file={"empty.png"} />
      <footer>
        <button className="make-memory-button">추억 만들러 가기 🥕</button>
      </footer>
    </section>
  );
}

export default SliderEmpty;
