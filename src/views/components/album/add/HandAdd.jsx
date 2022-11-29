import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import DragAndDrop from "views/components/album/add/auto/DragAndDrop";
import SearchKeyword from "./hand/SearchKeyword";
import SearchRoadAddr from "./hand/SearchRoadAddr";
import SearchLocation from "./hand/SearchLocation";

import "./HandAdd.scss";
function HandAdd(props) {
  const [searchKeyword, setSearchKeyword] = useState(false);
  const [searchRoadAddr, setSearchRoadAddr] = useState(false);
  const [searchLocation, setSearchLocation] = useState(false);

  const photoFile = useSelector((state) => state.photo.file);
  const photoData = useSelector((state) => state.photo.data);

  const searchData = useSelector((state) => state.album.addr);

  const handleSearchClose = (type) => {
    switch (type) {
      case "keyword":
        setSearchKeyword(false);
        break;
      case "roadaddr":
        setSearchRoadAddr(false);
        break;
      case "location":
        setSearchLocation(false);
        break;
    }
  };

  useEffect(() => {
    if (searchData) {
      console.log(searchData);
    }
  }, [searchData]);

  return (
    <section className="album-hand-info">
      <header className="info-header">
        <section className="info-title">
          <label htmlFor="title">제목</label>
          <input type="text" id="title" ref={props.titleRef}></input>
        </section>
        <section className="info-content">
          <label htmlFor="content">이야기</label>
          <input id="content" type="textarea" ref={props.contentRef}></input>
        </section>
      </header>
      <main className="info-main">
        <section className="info-main-top">
          <article className="info-date">
            <label htmlFor="date">
              날짜<span>(*)</span>
            </label>
            <input id="date" type="datetime-local" ref={props.dateRef}></input>
          </article>
        </section>
        <section className="info-main-middle">
          <article className="info-photo">
            <label htmlFor="photo">
              사진<span>(*)</span>
            </label>
            <DragAndDrop dragType="hand"></DragAndDrop>
          </article>
        </section>
        <section className="info-main-bottom">
          <label htmlFor="content">주소 추가</label>
          <aside className="info-addr-buttons">
            <button onClick={() => setSearchKeyword(true)}>키워드 검색</button>
            <button onClick={() => setSearchRoadAddr(true)}>도로명 검색</button>
            <button onClick={() => setSearchLocation(true)}>위치 선택</button>
          </aside>
          {searchData ? (
            <section className="info-addr">
              <article className="info-addr">
                <label htmlFor="addr">주소 확인</label>
                <input
                  id="addr"
                  type="text"
                  readOnly
                  ref={props.addrRef}
                ></input>
              </article>
              <article className="info-semi-addr">
                <label htmlFor="semi-addr">추가 정보</label>
                <input
                  id="semi-addr"
                  type="text"
                  ref={props.semiAddrRef}
                ></input>
              </article>
            </section>
          ) : null}
          <aside className="search-dialog-component">
            {searchKeyword ? (
              <SearchKeyword handleSearchClose={handleSearchClose} />
            ) : null}
            {searchRoadAddr ? (
              <SearchRoadAddr handleSearchClose={handleSearchClose} />
            ) : null}
            {searchLocation ? (
              <SearchLocation handleSearchClose={handleSearchClose} />
            ) : null}
          </aside>
        </section>
      </main>
    </section>
  );
}
export default HandAdd;
