import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./AlbumView.scss";
function AlbumView(props) {
  return (
    <article className="album-view-outside">
      <section className="album-view-top">
        <article
          className="view-addr"
          title={`🥕 ${props.marker.region.addr} ${props.marker.region.semiAddr}`}
        >
          <span className="view-addr-icon">🥕</span>
          <section className="view-addr-info">
            <article>{props.marker.region.addr}</article>
            <article>{props.marker.region.semiAddr}</article>
          </section>
        </article>
      </section>
      <section className="album-view-bottom">
        <article className="album-view-main">
          <section className="view-main-top">
            <article className="view-photos">
              <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                {props.photo?.map((photo, index) => {
                  const photoStyle =
                    photo.width > photo.height
                      ? { height: "100%" }
                      : { width: "100%" };
                  return (
                    <SwiperSlide key={`view-photo-${index}`}>
                      <img src={photo.url} style={photoStyle} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </article>
          </section>
          <section className="view-main-bottom">
            <article className="view-write">
              <header className="view-write-info">
                <article className="view-write-title">
                  {props.album.title}
                </article>
                <article className="view-write-date">
                  {props.album.date}
                </article>
              </header>
              <hr />
              <main className="view-write-main">
                <article className="view-write-content">
                  {props.album.content}
                </article>
              </main>
            </article>
          </section>
        </article>
      </section>
    </article>
  );
}

export default AlbumView;
