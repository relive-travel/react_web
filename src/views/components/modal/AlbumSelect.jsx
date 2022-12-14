import { useRef } from "react";
import { useDispatch } from "react-redux";

import {
  setAlbumAuto,
  setAlbumCreateDialog,
  setAlbumSelectModal,
} from "redux/slice/statusSlice";

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
        <section className="select-buttons">
          <button
            onClick={() => {
              dispatch(setAlbumAuto(true));
              dispatch(setAlbumSelectModal(false));
              dispatch(setAlbumCreateDialog(true));
            }}
          >
            간편하게!
          </button>
          <button
            onClick={() => {
              dispatch(setAlbumAuto(false));
              dispatch(setAlbumSelectModal(false));
              dispatch(setAlbumCreateDialog(true));
            }}
          >
            직접쓸래!
          </button>
        </section>
      </article>
    </section>
  );
}
export default AlbumSelect;
