import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

import DragAndDrop from "views/components/album/components/components/DragAndDrop";
import SearchKeyword from "./components/SearchKeyword";
import SearchRoadAddress from "./components/SearchRoadAddress";
import SearchLocation from "./components/SearchLocation";

import "./HandAdd.scss";
function HandAdd(props) {
  var dateRef = useRef(null);
  var addrRef = useRef(null);
  var semiAddrRef = useRef(null);

  const [searchKeyword, setSearchKeyword] = useState(false);
  const [searchRoadAddress, setSearchRoadAddress] = useState(false);
  const [searchLocation, setSearchLocation] = useState(false);

  const photoFile = useSelector((state) => state.photo.file);
  const photoData = useSelector((state) => state.photo.data);

  const searchData = useSelector((state) => state.album.search);

  useEffect(() => {
    console.log(photoData);
  }, [photoData]);

  return (
    <section className="album-hand-info">
      <header className="info-header">
        <label htmlFor="title">당근 제목</label>
        <input type="text" id="title"></input>
      </header>
      <main className="info-main">
        <section className="info-main-top">
          <article className="info-date">
            <label htmlFor="date">
              <span>*날짜</span>
            </label>
            <input
              id="date"
              type="datetime-local"
              ref={dateRef}
              readOnly
            ></input>
          </article>
        </section>
        <section className="info-main-middle">
          <article className="info-photo">
            <label htmlFor="photo">
              <span>*사진</span>
            </label>
            <DragAndDrop dragType="hand"></DragAndDrop>
          </article>
        </section>
        <section className="info-main-bottom">
          <label htmlFor="content">주소 추가</label>
          <aside className="info-address-buttons">
            <button onClick={() => setSearchKeyword(true)}>키워드 검색</button>
            <button onClick={() => setSearchRoadAddress(true)}>
              도로명 검색
            </button>
            <button onClick={() => setSearchLocation(true)}>위치 선택</button>
          </aside>
          {searchData ? (
            <section className="search-component">
              <input
                type="text"
                className="search-select"
                value="선택된정보임"
              ></input>
              <input
                type="text"
                className="search-optional"
                value="추가정보입력"
              ></input>
            </section>
          ) : null}
          <section className="search-dialog-component">
            {searchKeyword ? <SearchKeyword></SearchKeyword> : null}
            {searchRoadAddress ? <SearchRoadAddress></SearchRoadAddress> : null}
            {searchLocation ? <SearchLocation></SearchLocation> : null}
          </section>
        </section>
      </main>
      <footer className="info-footer">
        <label htmlFor="content">당근 이야기</label>
        <input id="content" type="textarea"></input>
      </footer>
    </section>
  );
}
export default HandAdd;
