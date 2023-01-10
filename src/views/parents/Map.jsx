import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMapOption, setMapRegion } from "redux/slice/mapSlice";

import useKakaoLogin from "hooks/useKakaoLogin";

import Logout from "views/components/home/Logout";

import D3Map from "views/components/map/D3Map.jsx";
import Slider from "views/components/addition/Slider.jsx";
import SideDial from "views/components/addition/SideDial";

import AlbumSelect from "views/components/modal/AlbumSelect";
import AlbumCreate from "views/components/album/AlbumCreate";
import AlbumSwiper from "views/components/album/AlbumSwiper";
import AlbumView from "views/components/album/AlbumView";
import PhotoGather from "views/components/photo/PhotoGather";

import UserEmpty from "views/components/modal/exception/UserEmpty";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import "./Map.scss";
import "../components/addition/index.scss";
import "../components/album/index.scss";
import "../components/modal/index.scss";
import "../components/modal/exception/index.scss";
import "../components/modal/success/index.scss";
import "../components/photo/index.scss";
import "views/animations/Dropdown.scss";
function Map() {
  const dispatch = useDispatch();

  const sliderRef = useRef(null);

  const [sliderOpen, setSliderOpen] = useState(false);

  const selectModalStatus = useSelector((state) => state.status.modal.select);
  const createDialogStatus = useSelector((state) => state.status.dialog.create);
  const swiperDialogStatus = useSelector((state) => state.status.dialog.swiper);
  const viewDialogStatus = useSelector((state) => state.status.dialog.view);
  const gatherOptionStatus = useSelector((state) => state.status.option.gather);

  const userEmptyNotifyStatus = useSelector(
    (state) => state.status.notify.user.empty
  );

  const handleSliderOpen = () => {
    sliderRef.current.classList.add("slider-open");
    setSliderOpen(true);
  };

  const handleSliderClose = () => {
    sliderRef.current.classList.remove("slider-open");
    setSliderOpen(false);
  };

  const handleSliderClick = (e) => {
    e.stopPropagation();
    if (sliderRef.current && !sliderRef.current.contains(e.target)) {
      sliderRef.current.classList.remove("slider-open");
      setSliderOpen(false);
    }
  };

  useEffect(() => {
    dispatch(setMapRegion("korea"));
    dispatch(
      setMapOption({ width: window.innerWidth, height: window.innerHeight })
    );
    window.onresize = function () {
      dispatch(
        setMapOption({ width: window.innerWidth, height: window.innerHeight })
      );
    };
  }, [dispatch]);

  useKakaoLogin();

  return (
    <section className="map-component" onClick={handleSliderClick}>
      <header>
        <Logout />
      </header>
      <main>
        <nav className="slider-component" ref={sliderRef}>
          <section className="slider-main">
            <Slider></Slider>
          </section>
          <section className="slider-button">
            {sliderOpen ? (
              <KeyboardDoubleArrowLeftIcon onClick={handleSliderClose} />
            ) : (
              <KeyboardDoubleArrowRightIcon onClick={handleSliderOpen} />
            )}
          </section>
        </nav>
        <section className="d3-component">
          <D3Map></D3Map>
        </section>
      </main>
      <aside>
        {selectModalStatus ? <AlbumSelect /> : null}
        {createDialogStatus ? <AlbumCreate /> : null}
        {swiperDialogStatus ? <AlbumSwiper /> : null}
        {viewDialogStatus ? <AlbumView /> : null}
        {gatherOptionStatus ? <PhotoGather /> : null}
        {userEmptyNotifyStatus ? <UserEmpty /> : null}
        <SideDial />
      </aside>
      <footer></footer>
    </section>
  );
}

export default Map;
