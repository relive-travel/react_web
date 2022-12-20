import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EffectCards, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { setAlbumSwiperDialog } from "redux/slice/statusSlice";

import AlbumView from "./AlbumView";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./AlbumSwiper.scss";
function AlbumSwiper(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);

  const albumData = useSelector((state) => state.album.data);

  const handleOutsideClick = (e) => {
    e.stopPropagation();
    if (!compRef.current?.contains(e.target)) {
      dispatch(setAlbumSwiperDialog(false));
    }
  };

  return (
    <section className="album-swiper-component" onClick={handleOutsideClick}>
      <Swiper
        ref={compRef}
        effect={"cards"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectCards, Pagination, Navigation]}
      >
        {albumData?.map((data, index) => {
          const { marker, album, photo } = data;
          return (
            <SwiperSlide key={index}>
              <AlbumView marker={marker} album={album} photo={photo} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
export default AlbumSwiper;
