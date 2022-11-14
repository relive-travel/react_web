import { useState } from "react";

import AutoAdd from "./components/AutoAdd";
import HandAdd from "./components/HandAdd";

import "./AlbumDialog.scss";
function AlbumDialog(props) {
  const [albumType, setAlbumType] = useState(true);
  return (
    <section className="album-component">
      <article className="album-main">
        <header className="album-title">당근 추가 하기</header>
        <main>{albumType ? <AutoAdd /> : <HandAdd />}</main>
        <footer className="album-buttons">
          <button className="album-preview-button">미리 보기</button>
          <button className="album-add-button">추가 하기</button>
        </footer>
      </article>
    </section>
  );
}
export default AlbumDialog;
