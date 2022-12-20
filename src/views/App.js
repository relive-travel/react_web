import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMapOption, setMapRegion } from "redux/slice/mapSlice";

import D3Map from "views/components/map/D3Map.jsx";
import Slider from "views/components/addition/Slider.jsx";
import SideDial from "./components/addition/SideDial";

import AlbumSelect from "./components/modal/AlbumSelect";
import AlbumCreate from "./components/album/AlbumCreate";
import AlbumSwiper from "./components/album/AlbumSwiper";
import PhotoGather from "./components/photo/PhotoGather";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import "./App.scss";
function App() {
  const dispatch = useDispatch();

  const sliderRef = useRef(null);

  const [sliderOpen, setSliderOpen] = useState(false);

  const selectStatus = useSelector((state) => state.status.modal.select);
  const createStatus = useSelector((state) => state.status.dialog.create);
  const swiperStatus = useSelector((state) => state.status.dialog.swiper);
  const gatherStatus = useSelector((state) => state.status.option.gather);

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
    window.onresize = function () {
      dispatch(
        setMapOption({ width: window.innerWidth, height: window.innerHeight })
      );
    };
    dispatch(setMapRegion("korea"));
    dispatch(
      setMapOption({ width: window.innerWidth, height: window.innerHeight })
    );
  }, [dispatch]);

  return (
    <div className="app-component" onClick={handleSliderClick}>
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
        <section className="map-component">
          <D3Map></D3Map>
        </section>
      </main>
      <aside>
        {selectStatus ? <AlbumSelect /> : null}
        {createStatus ? <AlbumCreate /> : null}
        {swiperStatus ? <AlbumSwiper /> : null}
        {gatherStatus ? <PhotoGather /> : null}
        <SideDial />
      </aside>
      <footer></footer>
    </div>
  );
}

export default App;
