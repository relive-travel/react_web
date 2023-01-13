import S3Image from "views/components/addition/S3Image";

function SearchKeywordMsg(props) {
  return (
    <section className="notify-search-keyword-message">
      <main>
        <article>{props.msg}</article>
      </main>
      <S3Image folder={"toshimee"} file={"here.png"} />
    </section>
  );
}

export default SearchKeywordMsg;
