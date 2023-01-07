import { useDispatch } from "react-redux";
import { setAlbumSelectModal } from "redux/slice/statusSlice";

import S3Image from "views/components/addition/S3Image";

function SliderEmpty() {
  const dispatch = useDispatch();

  return (
    <section className="slider-exception">
      <main>
        <article>
          아직은 <span className="main-color">추억</span>이 없어요...!
        </article>
      </main>
      <S3Image folder={"toshimee"} file={"empty.png"} />
      <footer>
        <button
          className="make-memory-button"
          onClick={() => {
            dispatch(setAlbumSelectModal(true));
          }}
        >
          추억 만들러 가기 🥕
        </button>
      </footer>
    </section>
  );
}

export default SliderEmpty;
