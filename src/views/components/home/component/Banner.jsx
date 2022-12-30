import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.scss";
function Banner() {
  return (
    <Swiper
      pagination={{
        type: "progressbar",
      }}
      slidesPerView={1}
      loop={true}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      <SwiperSlide>
        <section>1</section>
      </SwiperSlide>
      <SwiperSlide>2</SwiperSlide>
      <SwiperSlide>3</SwiperSlide>
      <SwiperSlide>4</SwiperSlide>
      <SwiperSlide>5</SwiperSlide>
    </Swiper>
  );
}

export default Banner;
