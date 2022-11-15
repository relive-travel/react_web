import { useState } from "react";

import "./AutoAdd.scss";
function AutoAdd(props) {
  const [inputFile, setInputFile] = useState(null);

  const handleInputFile = (e) => {
    const $preview = document.querySelector(".info-photo-preview");
    $preview.style.display = "block";
    console.log(e.target.files);
    setInputFile(e.target.files);
  };

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
            <input
              id="photo"
              type="file"
              onChange={handleInputFile}
              capture="user" // 사용자 방향
              // capture="environment"  // 외부 방향
              accept="image/*"
            ></input>
            <div className="info-photo-preview">
              {console.log(inputFile)}
              {console.log(JSON.stringify(inputFile))}
            </div>
          </div>
          <div className="info-location">
            <label htmlFor="location">위치</label>
            <div id="location"></div>
          </div>
        </section>
        {inputFile ? (
          <section className="info-main-bottom">
            <div className="info-date">
              <label htmlFor="date">
                <span>*날짜</span>
              </label>
              <input id="date" type="date"></input>
            </div>
            <div className="info-address">
              <label htmlFor="address">주소 확인</label>
              <input id="address" type="text"></input>
            </div>
            <div className="info-semi-address">
              <label htmlFor="semi-address">추가 주소 정보</label>
              <input id="semi-address" type="text"></input>
            </div>
          </section>
        ) : null}
      </main>
      <footer className="info-footer">
        <label htmlFor="content">당근 이야기</label>
        <input id="content" type="textarea"></input>
      </footer>
    </section>
  );
}
export default AutoAdd;
