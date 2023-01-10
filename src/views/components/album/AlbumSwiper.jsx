import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EffectCards, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { setAlbumSwiperDialog } from "redux/slice/statusSlice";

import AlbumView from "./AlbumView";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
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
    <section className="album-swiper-component">
      <Swiper
        ref={compRef}
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
      <aside onClick={handleOutsideClick}>
        <HighlightOffIcon />
      </aside>
    </section>
  );
}
export default AlbumSwiper;
