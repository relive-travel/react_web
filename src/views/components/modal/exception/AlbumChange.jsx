import { useDispatch } from "react-redux";

import { setAlbumChange } from "redux/slice/albumSlice";
import { setAlbumChangeModal } from "redux/slice/statusSlice";

import "./AlbumChange.scss";
function AlbumChange(props) {
  const dispatch = useDispatch();
  return (
    <section className="change-album-component">
      <article>
        <section className="change-album-main">
          <header className="change-album-title">
            이런..! 사진에 <span>데이터</span>가 없어요ㅠ.ㅠ
          </header>
          <main className="change-album-buttons">
            <button
              className="re-start-button"
              onClick={() => {
                dispatch(setAlbumChangeModal(false));
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
                dispatch(setAlbumChangeModal(false));
                props.handleClearPhoto();
              }}
            >
              사진
              <br />
              바꿀래요
            </button>
            <button
              className="write-hand-button"
              onClick={() => {
                dispatch(setAlbumChangeModal(false));
                dispatch(setAlbumChange());
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

export default AlbumChange;
