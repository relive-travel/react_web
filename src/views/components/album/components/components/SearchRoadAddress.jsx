import { useRef } from "react";
import "./SearchRoadAddress.scss";
function SearchRoadAddress(props) {
  const roadaddressRef = useRef(null);

  const handleSearchClick = (e) => {
    if (roadaddressRef.current && !roadaddressRef.current.contains(e.target)) {
      props.handleSearchClose("roadaddress");
    }
  };

  return (
    <section className="roadaddress-component" onClick={handleSearchClick}>
      <article ref={roadaddressRef}>
        <section className="roadaddress-main">
          <header className="roadaddress-input">
            <input type="text"></input>
            <button>검색</button>
          </header>
          <main className="roadaddress-preview">
            <section className="roadaddress-map"></section>
          </main>
          <footer className="roadaddress-list">
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
export default SearchRoadAddress;
