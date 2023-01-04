import { useRef } from "react";
import { useDispatch } from "react-redux";

import {
  setAlbumDialogAuto,
  setAlbumCreateDialog,
  setAlbumSelectModal,
} from "redux/slice/statusSlice";

import S3Image from "views/components/addition/S3Image";

import "./AlbumSelect.scss";
function AlbumSelect(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);

  const handleOutsideClick = (e) => {
    e.stopPropagation();
    if (!compRef.current?.contains(e.target)) {
      dispatch(setAlbumSelectModal(false));
    }
  };

  return (
    <section className="album-select-component" onClick={handleOutsideClick}>
      <article ref={compRef}>
        <section className="select-main">
          <header>
            <S3Image folder={"toshimee"} file={"select.png"} />
          </header>
          <footer className="select-buttons">
            <button
              className="select-auto-button"
              onClick={() => {
                dispatch(setAlbumDialogAuto(true));
                dispatch(setAlbumSelectModal(false));
                dispatch(setAlbumCreateDialog(true));
              }}
            >
              간편하게! 🥕
            </button>
            <button
              className="select-hand-button"
              onClick={() => {
                dispatch(setAlbumDialogAuto(false));
                dispatch(setAlbumSelectModal(false));
                dispatch(setAlbumCreateDialog(true));
              }}
            >
              직접쓸래! 🥕
            </button>
          </footer>
        </section>
      </article>
    </section>
  );
}
export default AlbumSelect;
