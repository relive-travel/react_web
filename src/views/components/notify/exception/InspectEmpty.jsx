import S3Image from "views/components/addition/S3Image";

function InspectEmpty() {
  return (
    <section className="inspect-exception">
      <main>
        <article>
          이런...!&nbsp;
          <span className="main-color">필수항목</span>이 비어있어요!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"hmm.png"} />
    </section>
  );
}

export default InspectEmpty;
