import { useState } from "react";

import "./AutoAdd.scss";
function AutoAdd(props) {
  const [inputFile, setInputFile] = useState(null);

  const handleInputFile = (e) => {
    setInputFile(e.target.files);
  };

  return (
    <section className="album-info">
      <header className="info-title">
        <label for="title">당근 제목</label>
        <input type="text" id="title"></input>
      </header>
      <main className="info-main">
        <div className="info-photo">
          <label for="photo">
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
          <div className="info-photo-preview"></div>
        </div>
        <div className="info-location">
          <label for="location">위치</label>
          <div id="location"></div>
        </div>
        {inputFile ? (
          <>
            <div className="info-address">
              <label for="address">주소 확인</label>
              <input id="address" type="text"></input>
            </div>
            <div className="info-semiAddress">
              <label for="semiAddress">추가 주소 정보</label>
              <input id="semiAddress" type="text"></input>
            </div>
            <div className="info-date">
              <label for="date">
                <span>*날짜</span>
              </label>
              <input id="date" type="date"></input>
            </div>
          </>
        ) : null}
      </main>
      <footer className="info-content">
        <input type="textarea"></input>
      </footer>
    </section>
  );
}
export default AutoAdd;
