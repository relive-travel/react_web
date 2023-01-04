import { useRef } from "react";
import { useDispatch } from "react-redux";

import { setNotifyAlbumCreate } from "redux/slice/statusSlice";

import AlbumCreateComplete from "views/components/notify/complete/AlbumCreateComplete";

import "./AlbumCreateSuccess";
function AlbumCreateSuccess() {
  const dispatch = useDispatch();

  const compRef = useRef();
  return (
    <section className="album-create-success-component">
      <article>
        <section className="album-create-success-main" ref={compRef}>
          <header>
            <AlbumCreateComplete />
          </header>
          <footer>
            <button
              className="create-success-ok-button"
              onClick={() => {
                dispatch(setNotifyAlbumCreate(false));
              }}
            >
              고마워요! 🥕
            </button>
          </footer>
        </section>
      </article>
    </section>
  );
}

export default AlbumCreateSuccess;
