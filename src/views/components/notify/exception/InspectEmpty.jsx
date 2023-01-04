import S3Image from "../../addition/S3Image";

function InspectEmpty() {
  return (
    <section className="inspect-exception">
      <main>
        이런...!&nbsp;<span>필수항목</span>이 비어있어요!
      </main>
      <S3Image folder={"toshimee"} file={"hmm.png"} />
    </section>
  );
}

export default InspectEmpty;
