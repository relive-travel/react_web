import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setPhotoData, setPhotoFile } from "redux/slice/photoSlice";

import AutoAdd from "./add/AutoAdd";
import HandAdd from "./add/HandAdd";
import ChangeAlbum from "./exception/album/ChangeAlbum";

import "./AlbumDialog.scss";
function AlbumDialog(props) {
  const dispatch = useDispatch();

  var titleRef = useRef(null);
  var textRef = useRef(null);
  var dateRef = useRef(null);
  var addrRef = useRef(null);
  var semiAddrRef = useRef(null);
  var kakaoMapRef = useRef(null);

  const [albumType, setAlbumType] = useState(props.albumType);

  const [changeOpen, setChangeOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleChangeAlbumOpen = () => {
    setChangeOpen(true);
  };

  const handleChangeAlbumClose = () => {
    setChangeOpen(false);
  };

  const handlePreviewAlbumOpen = () => {
    setPreviewOpen(true);
  };

  const handlePreviewAlbumClose = () => {
    setPreviewOpen(false);
  };

  const handleChangeAlbum = () => {
    setAlbumType("hand");
  };

  const handleClearAlbum = () => {
    titleRef.current.value = "";
    textRef.current.value = "";
    dateRef.current.value = "";
    addrRef.current.value = "";
    semiAddrRef.current.value = "";
    dispatch(setPhotoFile(null));
    dispatch(setPhotoData(null));
  };

  const handlePreviewAlbum = () => {
    handlePreviewAlbumOpen();
  };

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
            kakaoMapRef={kakaoMapRef}
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
          <ChangeAlbum
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
