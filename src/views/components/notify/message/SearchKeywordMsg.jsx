import S3Image from "views/components/addition/S3Image";

function SearchKeywordMsg() {
  return (
    <section className="notify-search-keyword-message">
      <main>
        <article>
          <span className="highlight">검색</span>해서&nbsp;
          <span className="highlight">장소</span>를 골라줘!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"here.png"} />
    </section>
  );
}

export default SearchKeywordMsg;
