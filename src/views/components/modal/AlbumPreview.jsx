import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumPreviewModal } from "redux/slice/statusSlice";

import { childNodesFilter } from "lib/utils/jsUtils";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./AlbumPreview.scss";
function AlbumPreview(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);

  const [childNodes, setChildNodes] = useState();

  const handleOutsideClick = (e) => {
    e.stopPropagation();
    if (!compRef.current?.contains(e.target)) {
      dispatch(setAlbumPreviewModal(false));
    }
  };

  useEffect(() => {
    setChildNodes(
      childNodesFilter({
        childNodes: props.preview,
        keepType: "ARTICLE",
      })
    );
  }, []);

  return (
    <section className="album-preview-component" onClick={handleOutsideClick}>
      <article className="album-preview-outside" ref={compRef}>
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
