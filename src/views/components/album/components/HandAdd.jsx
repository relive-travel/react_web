import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

import DragAndDrop from "views/common/DragAndDrop";
import SearchKeyword from "./components/SearchKeyword";
import SearchRoadAddress from "./components/SearchRoadAddress";
import SearchLocation from "./components/SearchLocation";

import "./HandAdd.scss";
function HandAdd(props) {
  var dateRef = useRef(null);
  var addrRef = useRef(null);
  var semiAddrRef = useRef(null);

  const [searchType, setSearchType] = useState(null);

  const photoFile = useSelector((state) => state.photo.file);
  const photoData = useSelector((state) => state.photo.data);

  useEffect(() => {
    console.log(photoData);
  }, [photoData]);

  return (
    <section className="album-auto-info">
      <header className="info-header">
        <label htmlFor="title">당근 제목</label>
        <input type="text" id="title"></input>
      </header>
      <main className="info-main">
        <section className="info-main-top">
          <div className="info-photo">
            <label htmlFor="photo">
              <span>*사진</span>
            </label>
            <DragAndDrop></DragAndDrop>
          </div>
          <div className="info-location">
            <label htmlFor="location">위치</label>
            <div className="kakao-map-auto" id="location"></div>
          </div>
        </section>
        <section className="info-main-bottom">
          <div className="info-date">
            <label htmlFor="date">
              <span>*날짜</span>
            </label>
            <input
              id="date"
              type="datetime-local"
              ref={dateRef}
              readOnly
            ></input>
          </div>
          <div className="info-add-address-buttons">
            <button onClick={() => setSearchType("keyword")}>
              키워드 검색
            </button>
            <button onClick={() => setSearchType("road")}>도로명 검색</button>
            <button onClick={() => setSearchType("location")}>위치 선택</button>
          </div>
          {searchType === "keyword" ? (
            <SearchKeyword />
          ) : searchType === "road" ? (
            <SearchRoadAddress />
          ) : searchType === "location" ? (
            <SearchLocation />
          ) : null}
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
