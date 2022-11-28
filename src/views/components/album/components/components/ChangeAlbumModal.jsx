import { useRef } from "react";

import "./ChangeAlbumModal.scss";
function ChangeAlbumModal(props) {
  var compRef = useRef(null);

  return (
    <section className="change-album-modal">
      <article className="change-album-component">
        <section className="change-album-main">
          <header className="change-album-title">
            이런..! 사진에 <span>데이터</span>가 없어요ㅠ.ㅠ
          </header>
          <main className="change-album-buttons">
            <button
              className="re-start-button"
              onClick={() => {
                props.handleChangeAlbumClose();
                props.handleClearAlbum();
              }}
            >
              처음부터
              <br />
              다시쓸래요
            </button>
            <button
              className="change-picture-button"
              onClick={() => {
                props.handleChangeAlbumClose();
              }}
            >
              사진
              <br />
              바꿀래요
            </button>
            <button
              className="write-hand-button"
              onClick={() => {
                props.handleChangeAlbumClose();
                props.handleChangeAlbum();
              }}
            >
              직접
              <br />
              쓸래요!
            </button>
          </main>
        </section>
      </article>
    </section>
  );
}

export default ChangeAlbumModal;
