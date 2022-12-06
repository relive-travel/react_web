import { useDispatch } from "react-redux";

import { setAlbumViewDialog } from "redux/slice/statusSlice";

import "./AlbumView.scss";
function AlbumView(props) {
  const dispatch = useDispatch();

  return (
    <article>
      <section className="album-view-top">
        <article className="view-addr">하하하</article>
      </section>
      <section className="album-view-bottom">
        <article className="album-view-main">
          <section className="view-main-top">
            <article className="view-photos"></article>
          </section>
          <section className="view-main-bottom">
            <article className="view-writing">
              <section className="view-writing-top">
                <article className="writing-title">하하하</article>
                <article className="writing-date">하하하</article>
              </section>
              <hr />
              <section className="view-writing-bottom">
                <article className="writing-content">하하하</article>
              </section>
            </article>
          </section>
        </article>
      </section>
    </article>
  );
}

export default AlbumView;
