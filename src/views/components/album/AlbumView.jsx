import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./AlbumView.scss";
function AlbumView(props) {
  return (
    <article>
      <section className="album-view-top">
        <article
          className="view-addr"
          title={`🥕 ${props.album.marker.region.addr} ${props.album.marker.region.semiAddr}`}
        >
          🥕 {props.album.marker.region.addr}{" "}
          {props.album.marker.region.semiAddr}
        </article>
      </section>
      <section className="album-view-bottom">
        <article className="album-view-main">
          <section className="view-main-top">
            <article className="view-photos">
              <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                {props.album.photo.map((photo, index) => {
                  const photoStyle =
                    photo.width > photo.height
                      ? { height: "100%" }
                      : { width: "100%" };
                  return (
                    <SwiperSlide key={index}>
                      <img
                        className={`photo-${index}`}
                        src={photo.url}
                        style={photoStyle}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </article>
          </section>
          <section className="view-main-bottom">
            <article className="view-writing">
              <section className="view-writing-top">
                <article className="writing-title">{props.album.title}</article>
                <article className="writing-date">{props.album.date}</article>
              </section>
              <hr />
              <section className="view-writing-bottom">
                <article className="writing-content">
                  {props.album.content}
                </article>
              </section>
            </article>
          </section>
        </article>
      </section>
    </article>
  );
}

export default AlbumView;
