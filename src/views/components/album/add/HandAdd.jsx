import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAlbumHandKeywordDialog,
  setAlbumHandLocationDialog,
  setAlbumHandRoadAddrDialog,
} from "redux/slice/statusSlice";

import DragAndDrop from "views/components/album/add/auto/DragAndDrop";
import SearchKeyword from "./hand/SearchKeyword";
import SearchRoadAddr from "./hand/SearchRoadAddr";
import SearchLocation from "./hand/SearchLocation";

import "./HandAdd.scss";
function HandAdd(props) {
  const dispatch = useDispatch();

  const searchData = useSelector((state) => state.album.search);

  const keywordDialogStatus = useSelector(
    (state) => state.status.dialog.keyword
  );
  const roadAddrDialogStatus = useSelector(
    (state) => state.status.dialog.roadAddr
  );
  const locationDialogStatus = useSelector(
    (state) => state.status.dialog.location
  );

  useEffect(() => {
    if (searchData) {
      props.addrRef.current.value = searchData.addr;
      props.semiAddrRef.current.value = searchData.semiAddr
        ? searchData.semiAddr
        : "";
    }
  }, [searchData]);

  return (
    <section className="album-hand-info">
      <header className="info-header">
        <section className="info-title">
          <label htmlFor="title">
            제목<span>(*)</span>
          </label>
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
            <input
              id="date"
              type="datetime-local"
              max="9999-12-31"
              ref={props.dateRef}
            ></input>
          </article>
        </section>
        <section className="info-main-middle">
          <article className="info-photo">
            <label htmlFor="photo">
              사진<span>(*)</span>
            </label>
            <DragAndDrop
              dragType="hand"
              photoRef={props.photoRef}
              previewRef={props.previewRef}
            ></DragAndDrop>
          </article>
        </section>
        <section className="info-main-bottom">
          <label htmlFor="content">
            주소 추가<span>(*)</span>
          </label>
          <aside className="info-addr-buttons">
            <button
              onClick={() => {
                dispatch(setAlbumHandKeywordDialog(true));
              }}
            >
              키워드 검색
            </button>
            <button
              onClick={() => {
                dispatch(setAlbumHandRoadAddrDialog(true));
              }}
            >
              도로명 검색
            </button>
            <button
              onClick={() => {
                dispatch(setAlbumHandLocationDialog(true));
              }}
            >
              위치 선택
            </button>
          </aside>
          {searchData ? (
            <section className="info-addres">
              <article className="info-addr">
                <label htmlFor="addr">
                  주소 확인<span>(*)</span>
                </label>
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
            {keywordDialogStatus ? <SearchKeyword /> : null}
            {roadAddrDialogStatus ? <SearchRoadAddr /> : null}
            {locationDialogStatus ? <SearchLocation /> : null}
          </aside>
        </section>
      </main>
    </section>
  );
}
export default HandAdd;
