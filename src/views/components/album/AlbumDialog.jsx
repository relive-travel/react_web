import { useState } from "react";

import AutoAdd from "./components/AutoAdd";
import HandAdd from "./components/HandAdd";

import "./AlbumDialog.scss";
function AlbumDialog(props) {
  const [albumType, setAlbumType] = useState(props.albumType);
  return (
    <article className="album-main">
      <header className="album-title">당근 추가 하기</header>
      <main>{albumType === "auto" ? <AutoAdd /> : <HandAdd />}</main>
      <footer className="album-buttons">
        <button className="album-preview-button">미리 보기</button>
        <button className="album-add-button">추가 하기</button>
      </footer>
    </article>
  );
}
export default AlbumDialog;
