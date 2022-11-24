import { useRef } from "react";
import "./SearchKeyword.scss";
function SearchKeyword(props) {
  const keywordRef = useRef(null);

  const handleSearchClick = (e) => {
    if (keywordRef.current && !keywordRef.current.contains(e.target)) {
      props.handleSearchClose("roadaddress");
    }
  };

  return (
    <section className="keyword-component" onClick={handleSearchClick}>
      <article ref={keywordRef}>
        <section className="keyword-main">
          <header className="keyword-input">
            <input type="text"></input>
            <button>검색</button>
          </header>
          <main className="keyword-preview">
            <section className="keyword-map"></section>
          </main>
          <footer className="keyword-list">
            <section>
              <article></article>
              <button>보기</button>
            </section>
          </footer>
        </section>
      </article>
    </section>
  );
}
export default SearchKeyword;
