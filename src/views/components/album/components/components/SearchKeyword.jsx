import { useCallback, useEffect, useRef } from "react";

import { setKakaoMapWithKeyword } from "lib/setKakaoMap";

import "./SearchKeyword.scss";
function SearchKeyword(props) {
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const pageRef = useRef(null);
  const compRef = useRef(null);
  const kakaoMapRef = useRef(null);

  const handleSearchClick = (e) => {
    if (compRef.current && !compRef.current.contains(e.target)) {
      props.handleSearchClose("roadaddress");
    }
  };

  const handleSetKakaoMap = useCallback(() => {
    if (inputRef.current.value) {
      setKakaoMapWithKeyword({
        mapContainer: kakaoMapRef.current,
        listContainer: listRef.current,
        pageContainer: pageRef.current,
        keyword: inputRef.current.value,
      });
    } else {
      alert("입력해주세요!");
    }
  });

  const handleGetCheckBox = () => {
    const $checked = listRef.current.querySelector(
      "input[type=checkbox]:checked"
    );

    if ($checked) {
      const $checkedParent = $checked.parentNode;
      const placeName = $checkedParent.querySelector(".place-name").innerHTML,
        placeRoadAddrName = $checkedParent.querySelector(
          ".place-road-addr-name"
        ).innerHTML,
        placeAddrName =
          $checkedParent.querySelector(".place-addr-name").innerHTML;

      console.log(placeName, placeAddrName, placeRoadAddrName);
    } else {
      alert("선택해주세요!");
    }
  };

  return (
    <section className="keyword-component" onClick={handleSearchClick}>
      <article ref={compRef}>
        <section className="keyword-main">
          <header className="keyword-input">
            <input
              type="text"
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSetKakaoMap();
              }}
            ></input>
            <button onClick={handleSetKakaoMap}>검색</button>
          </header>
          <main className="keyword-preview">
            <section className="kakao-map-keyword" ref={kakaoMapRef}></section>
          </main>
          <footer>
            <section className="keyword-list" ref={listRef}></section>
            <section className="keyword-pagenation" ref={pageRef}></section>
          </footer>
          <button onClick={handleGetCheckBox}>선택</button>
        </section>
      </article>
    </section>
  );
}
export default SearchKeyword;
