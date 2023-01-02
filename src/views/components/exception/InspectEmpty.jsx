import S3Image from "../addition/S3Image";

function InspectEmpty() {
  return (
    <section className="inspect-exception">
      <S3Image folder={"toshimee"} file={"hmm.png"} />
      <main>
        이런..! <span>필수항목</span>이 비어있어요!
      </main>
    </section>
  );
}

export default InspectEmpty;
