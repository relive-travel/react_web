import { useRef, useState } from "react";

import AutoAdd from "./components/AutoAdd";
import HandAdd from "./components/HandAdd";
import ChangeAlbumModal from "./components/components/ChangeAlbumModal";

import "./AlbumDialog.scss";
function AlbumDialog(props) {
  var titleRef = useRef(null);
  var textRef = useRef(null);
  var dateRef = useRef(null);
  var addrRef = useRef(null);
  var semiAddrRef = useRef(null);

  const [albumType, setAlbumType] = useState(props.albumType);

  const [changeOpen, setChangeOpen] = useState(false);

  const handleChangeAlbumOpen = () => {
    setChangeOpen(true);
  };

  const handleChangeAlbumClose = () => {
    setChangeOpen(false);
  };

  const handleChangeAlbum = (props) => {};

  const handleClearAlbum = () => {};

  const handlePreviewAlbum = () => {};

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
            handleChangeAlbumOpen={handleChangeAlbumOpen}
          />
        ) : (
          <HandAdd />
        )}
      </main>
      <footer className="album-buttons">
        <button className="album-clear-button" onClick={handleClearAlbum}>
          초기화
        </button>
        <button className="album-preview-button" onClick={handlePreviewAlbum}>
          미리 보기
        </button>
        <button className="album-add-button" onClick={handleAddAlbum}>
          추가 하기
        </button>
      </footer>
      <aside>
        {changeOpen ? (
          <ChangeAlbumModal
            handleClearAlbum={handleClearAlbum}
            handleChangeAlbumClose={handleChangeAlbumClose}
            handleChangeAlbum={handleChangeAlbum}
          />
        ) : null}
      </aside>
    </article>
  );
}
export default AlbumDialog;
