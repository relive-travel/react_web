import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAlbumType } from "redux/slice/albumSlice";
import {
  setAlbumCreateDialog,
  setAlbumSelectModal,
} from "redux/slice/statusSlice";

import "./AlbumSelect.scss";
function AlbumSelect(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setAlbumCreateDialog(true));
  }, []);

  return (
    <section className="album-select-component">
      <article>
        <section className="select-buttons">
          <button
            onClick={() => {
              dispatch(setAlbumSelectModal(false));
              dispatch(setAlbumType("auto"));
            }}
          >
            간편하게!
          </button>
          <button
            onClick={() => {
              dispatch(setAlbumSelectModal(false));
              dispatch(setAlbumType("hand"));
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
