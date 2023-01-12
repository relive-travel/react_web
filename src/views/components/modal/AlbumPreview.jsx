import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { setAlbumPreviewModal } from "redux/slice/statusSlice";

import { childNodesFilter } from "lib/utils/jsUtils";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "swiper/css";
import "swiper/css/pagination";
function AlbumPreview(props) {
  const dispatch = useDispatch();

  const [childNodes, setChildNodes] = useState();

  useEffect(() => {
    setChildNodes(
      childNodesFilter({
        childNodes: props.preview,
        keepType: "SECTION",
      })
    );
  }, []);

  return (
    <section className="album-preview-component">
      <article className="album-preview-outside">
        <section className="album-preview-top">
          <article
            className="preview-addr"
            title={`${props.addr} ${props.semiAddr}`}
          >
            <span className="preview-addr-icon">🥕</span>
            <section className="preview-addr-info">
              <article>{props.addr}</article>
              <article>{props.semiAddr}</article>
            </section>
            <aside
              className="album-close-button"
              onClick={() => {
                dispatch(setAlbumPreviewModal(false));
              }}
            >
              <HighlightOffIcon />
            </aside>
          </article>
        </section>
        <section className="album-preview-bottom">
          <article className="album-preview-main">
            <section className="preivew-main-top">
              <article className="preview-photos">
                <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                  {childNodes?.map((child, index) => {
                    const { src, style } = child.firstChild;
                    const photoStyle = {
                      width: style.width,
                      height: style.height,
                    };
                    return (
                      <SwiperSlide key={`preview-photo-${index}`}>
                        <img src={src} style={photoStyle} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </article>
            </section>
            <section className="preview-main-bottom">
              <article className="preview-write">
                <header className="preview-write-info">
                  <article className="preview-write-title">
                    {props.title}
                  </article>
                  <article className="preview-write-date">
                    {props.date.split("T").join(" ")}
                  </article>
                </header>
                <hr />
                <main className="preview-write-main">
                  <article className="preview-write-content">
                    {props.content}
                  </article>
                </main>
              </article>
            </section>
          </article>
        </section>
      </article>
    </section>
  );
}
export default AlbumPreview;
