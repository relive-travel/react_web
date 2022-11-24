import { useRef } from "react";
import "./SearchLocation.scss";
function SearchLocation(props) {
  const locationRef = useRef(null);

  const handleSearchClick = (e) => {
    if (locationRef.current && !locationRef.current.contains(e.target)) {
      props.handleSearchClose("roadaddress");
    }
  };

  return (
    <section className="location-component" onClick={handleSearchClick}>
      <article ref={locationRef}>
        <section className="location-main">
          <header className="location-input">
            <input type="text"></input>
            <button>검색</button>
          </header>
          <main className="location-preview">
            <section className="location-map"></section>
          </main>
          <footer className="location-list">
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
export default SearchLocation;
