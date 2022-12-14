import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumPreviewModal } from "redux/slice/statusSlice";

import { childNodesFilter } from "lib/utils/filter";

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
      <article ref={compRef}>
        <section className="album-preview-top">
          <article
            className="preview-addr"
            title={`${props.addr} ${props.semiAddr}`}
          >
            🥕 {props.addr} {props.semiAddr}
          </article>
        </section>
        <section className="album-preview-bottom">
          <article className="album-preview-main">
            <section className="preivew-main-top">
              <article className="preview-photos">
                <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                  {childNodes?.map((child, index) => {
                    const { src, style } = child.firstChild;
                    const newStyle = {
                      width: style.width,
                      height: style.height,
                    };
                    return (
                      <SwiperSlide key={index}>
                        <img
                          className={`slider-photo-${index}`}
                          src={src}
                          style={newStyle}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </article>
            </section>
            <section className="preview-main-bottom">
              <article className="preview-writing">
                <section className="preview-writing-top">
                  <article className="writing-title">{props.title}</article>
                  <article className="writing-date">
                    {props.date.split("T").join(" ")}
                  </article>
                </section>
                <hr />
                <section className="preview-writing-bottom">
                  <article className="writing-content">{props.content}</article>
                </section>
              </article>
            </section>
          </article>
        </section>
      </article>
    </section>
  );
}
export default AlbumPreview;
