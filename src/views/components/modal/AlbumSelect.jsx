import { useDispatch } from "react-redux";

import {
  setAlbumDialogAuto,
  setAlbumCreateDialog,
  setAlbumSelectModal,
} from "redux/slice/statusSlice";

import AlbumSelectMsg from "../notify/message/AlbumSelectMsg";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function AlbumSelect(props) {
  const dispatch = useDispatch();

  return (
    <section className="album-select-component">
      <article>
        <section className="select-main">
          <header>
            <AlbumSelectMsg />
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
          <aside
            className="dialog-close-button"
            onClick={() => {
              dispatch(setAlbumSelectModal(false));
            }}
          >
            <HighlightOffIcon />
          </aside>
        </section>
      </article>
    </section>
  );
}
export default AlbumSelect;
