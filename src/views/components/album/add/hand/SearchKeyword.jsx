import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumSearch } from "redux/slice/albumSlice";

import { setKakaoMapWithKeyword } from "lib/setKakaoMap";

import "./SearchKeyword.scss";
function SearchKeyword(props) {
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const pageRef = useRef(null);
  const compRef = useRef(null);
  const kakaoMapRef = useRef(null);

  const [keywordRes, setKeywordRes] = useState(null);

  const handleSearchClick = (e) => {
    if (compRef.current && !compRef.current.contains(e.target)) {
      props.handleSearchClose("keyword");
    }
  };

  const handleSetKakaoMap = useCallback(() => {
    if (inputRef.current.value) {
      setKakaoMapWithKeyword(
        {
          mapContainer: kakaoMapRef.current,
          listContainer: listRef.current,
          pageContainer: pageRef.current,
          keyword: inputRef.current.value,
        },
        (keywordResult) => {
          setKeywordRes(keywordResult);
        }
      );
    } else {
      alert("입력해주세요!");
    }
  });

  const handleSelectResult = () => {
    dispatch(setAlbumSearch(keywordRes));
    props.handleSearchClose("keyword");
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
          <button onClick={handleSelectResult}>선택</button>
        </section>
        <aside>
          <section className="keyword-list" ref={listRef}></section>
          <section className="keyword-pagenation" ref={pageRef}></section>
        </aside>
      </article>
    </section>
  );
}
export default SearchKeyword;