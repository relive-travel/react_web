import { useRef, useState } from "react";

import AutoAdd from "./components/AutoAdd";
import HandAdd from "./components/HandAdd";

import "./AlbumDialog.scss";
function AlbumDialog(props) {
  var titleRef = useRef(null);
  var textRef = useRef(null);
  var dateRef = useRef(null);
  var addrRef = useRef(null);
  var semiAddrRef = useRef(null);

  const [albumType, setAlbumType] = useState(props.albumType);

  const handleChangeAlbum = (props) => {};

  const handleAddAlbum = () => {
    console.log(
      titleRef.current.value,
      textRef.current.value,
      dateRef.current.value,
      addrRef.current.value,
      semiAddrRef.current.value
    );
  };

  return (
    <article className="album-main">
      <header className="album-title">당근 추가 하기</header>
      <main>
        {albumType === "auto" ? (
          <AutoAdd
            titleRef={titleRef}
            textRef={textRef}
            dateRef={dateRef}
            addrRef={addrRef}
            semiAddrRef={semiAddrRef}
            handleChangeAlbum={handleChangeAlbum}
          />
        ) : (
          <HandAdd />
        )}
      </main>
      <footer className="album-buttons">
        <button className="album-clear-button">초기화</button>
        <button className="album-preview-button">미리 보기</button>
        <button className="album-add-button" onClick={handleAddAlbum}>
          추가 하기
        </button>
      </footer>
    </article>
  );
}
export default AlbumDialog;
