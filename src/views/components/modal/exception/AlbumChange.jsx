import { useDispatch } from "react-redux";

import {
  setAlbumDialogAuto,
  setAlbumChangeModal,
} from "redux/slice/statusSlice";

import PhotoDataEmpty from "views/components/notify/exception/PhotoDataEmpty";

function AlbumChange(props) {
  const dispatch = useDispatch();
  return (
    <section className="album-change-component">
      <article>
        <section className="album-change-main">
          <header>
            <PhotoDataEmpty />
          </header>
          <footer className="album-change-buttons">
            <button
              className="change-restart-button"
              onClick={() => {
                dispatch(setAlbumChangeModal(false));
                props.handleClearAlbum();
              }}
            >
              <aside>🥕</aside>
              <main>
                처음부터
                <br />
                다시쓸래요!
              </main>
              <aside>🥕</aside>
            </button>
            <button
              className="change-picture-button"
              onClick={() => {
                dispatch(setAlbumChangeModal(false));
                props.handleClearPhoto();
              }}
            >
              <aside>🥕</aside>
              <main>
                사진
                <br />
                바꿀래요!
              </main>
              <aside>🥕</aside>
            </button>
            <button
              className="change-write-button"
              onClick={() => {
                dispatch(setAlbumChangeModal(false));
                dispatch(setAlbumDialogAuto(false));
              }}
            >
              <aside>🥕</aside>
              <main>
                직접
                <br />
                쓸래요!
              </main>
              <aside>🥕</aside>
            </button>
          </footer>
        </section>
      </article>
    </section>
  );
}

export default AlbumChange;
