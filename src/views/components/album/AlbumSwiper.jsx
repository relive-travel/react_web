import { useEffect } from "react";
import { useSelector } from "react-redux";

import { EffectCards, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import AlbumView from "./AlbumView";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./AlbumSwiper.scss";
function AlbumSwiper(props) {
  const albumData = useSelector((state) => state.album.data);

  useEffect(() => {
    console.log(albumData);
  }, [albumData]);

  return (
    <section className="album-swiper-component">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectCards, Pagination, Navigation]}
      >
        {albumData?.map((album) => {
          return (
            <SwiperSlide>
              <AlbumView album={album} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
export default AlbumSwiper;
