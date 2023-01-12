import { useRef } from "react";
import { useSelector } from "react-redux";

import { EffectCards, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import AlbumView from "./AlbumView";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
function AlbumSwiper(props) {
  const albumData = useSelector((state) => state.album.data);

  return (
    <section className="album-swiper-component">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCards, Pagination, Navigation]}
      >
        {albumData?.map((data, index) => {
          const { marker, album, photo } = data;
          return (
            <SwiperSlide
              className="album-view-component"
              key={`swiper-view-${index}`}
            >
              <AlbumView marker={marker} album={album} photo={photo} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
export default AlbumSwiper;
