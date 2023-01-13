import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumSearch } from "redux/slice/albumSlice";
import { setAlbumHandKeywordDialog } from "redux/slice/statusSlice";

import { setKakaoMapWithKeyword } from "lib/utils/map/kakaoMap";

import SearchKeywordMsg from "views/components/notify/message/SearchKeywordMsg";

function SearchKeyword(props) {
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const pageRef = useRef(null);
  const kakaoMapRef = useRef(null);

  const [keywordRes, setKeywordRes] = useState(null);
  const [keywordMsg, setKeywordMsg] = useState(
    <>
      <span className="highlight">검색</span>해서&nbsp;
      <span className="highlight">장소</span>를 골라줘!
    </>
  );

  const handleSetKakaoMap = () => {
    if (inputRef.current.value) {
      setKeywordMsg(
        <>
          <span className="highlight">장소</span>를 골라줘!
        </>
      );
      setKakaoMapWithKeyword(
        {
          mapContainer: kakaoMapRef.current,
          listContainer: listRef.current,
          pageContainer: pageRef.current,
          keyword: inputRef.current.value,
        },
        (keywordResult) => {
          // 검색 결과가 없는 경우
          if (keywordResult.status) {
            setKeywordMsg(keywordResult.msg);
            setKeywordRes(null);
          } else {
            setKeywordRes(keywordResult);
          }
        }
      );
    } else {
      setKeywordMsg(
        <>
          <span className="highlight">검색어</span>를&nbsp;
          <span className="highlight">꼭</span> 넣어줘!
        </>
      );
    }
  };

  const handleSelectResult = () => {
    const res = {
      latitude: parseFloat(keywordRes.y),
      longitude: parseFloat(keywordRes.x),
      addr: keywordRes.address_name,
      semiAddr: keywordRes.place_name,
    };
    dispatch(setAlbumSearch(res));
    dispatch(setAlbumHandKeywordDialog(false));
  };

  return (
    <section className="search-keyword-component">
      <article>
        <section className="search-keyword-main">
          <header className="keyword-input">
            <input
              type="text"
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSetKakaoMap();
              }}
            ></input>
            <aside>
              <button
                className="keyword-search-button"
                onClick={handleSetKakaoMap}
              >
                검색
              </button>
            </aside>
          </header>
          <main className="keyword-preview">
            <section className="kakao-map-info" ref={kakaoMapRef}>
              <SearchKeywordMsg msg={keywordMsg} />
            </section>
          </main>
          <footer>
            <button
              className="keyword-cancel-button"
              onClick={() => {
                dispatch(setAlbumHandKeywordDialog(false));
              }}
            >
              취소
            </button>
            <button
              className="keyword-select-button"
              onClick={handleSelectResult}
            >
              선택
            </button>
          </footer>
        </section>
        <section className="search-keyword-result">
          <section className="keyword-list" ref={listRef}></section>
          <section className="keyword-pagenation" ref={pageRef}></section>
        </section>
      </article>
    </section>
  );
}
export default SearchKeyword;
