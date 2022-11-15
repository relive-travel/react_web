import { useState } from "react";

import SearchKeyword from "./components/SearchKeyword";
import SearchRoadAddress from "./components/SearchRoadAddress";
import SelectLocation from "./components/SelectLocation";

import "./HandAdd.scss";
function HandAdd(props) {
  const [inputFile, setInputFile] = useState(null);
  const [selectType, setSelectType] = useState(null);

  const handleInputFile = (e) => {
    setInputFile(e.target.files);
  };

  const handleChangeSelectType = (type) => (e) => {
    const $prevButton = document.querySelector("button-clicked");
    $prevButton.classList.remove("button-clicked");
    const $button = e.target;
    $button.classList.add("button-clicked");
    setSelectType(type);
  };

  return (
    <section className="album-hand-info">
      <header className="info-title">
        <label htmlFor="title">당근 제목</label>
        <input type="text" id="title"></input>
      </header>
      <main className="info-main">
        <div className="info-photo">
          <label htmlFor="photo">
            <span>*사진</span>
          </label>
          <input
            id="photo"
            type="file"
            onChange={handleInputFile}
            capture="user" // 사용자 방향
            // capture="environment"  // 외부 방향
            accept="image/*"
            multiple
          ></input>
          <div className="info-photo-preview"></div>
        </div>
        <div className="info-date">
          <label htmlFor="date">
            <span>*날짜</span>
          </label>
          <input id="date" type="date"></input>
        </div>
        <div className="info-date">
          <label htmlFor="date">
            <span>*주소 추가</span>
          </label>
        </div>
        <div className="info-add-address-buttons">
          <button onClick={handleChangeSelectType("keyword")}>
            키워드 검색
          </button>
          <button onClick={handleChangeSelectType("road")}>도로명 검색</button>
          <button onClick={handleChangeSelectType("location")}>
            위치 선택
          </button>
        </div>
        {selectType === "keyword" ? (
          <SearchKeyword />
        ) : selectType === "road" ? (
          <SearchRoadAddress />
        ) : selectType === "location" ? (
          <SelectLocation />
        ) : null}
      </main>
      <footer className="info-content">
        <label htmlFor="content">당근 이야기</label>
        <input id="content" type="textarea"></input>
      </footer>
    </section>
  );
}
export default HandAdd;
