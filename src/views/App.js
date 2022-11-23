import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setMapOption, setMapRegion } from "redux/slice/mapSlice";

import D3Map from "views/components/map/D3Map.jsx";
import Slider from "views/components/slider/Slider.jsx";
import AlbumSelect from "./components/album/AlbumSelect";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import "./App.scss";
function App() {
  const dispatch = useDispatch();

  const sliderRef = useRef(null);

  const [sliderOpen, setSliderOpen] = useState(false);
  const [albumSelectOpen, setAlbumSelectOpen] = useState(false);

  const handleSliderOpen = () => {
    sliderRef.current.classList.add("slider-open");
    setSliderOpen(true);
  };

  const handleSliderClose = () => {
    sliderRef.current.classList.remove("slider-open");
    setSliderOpen(false);
  };

  const handleSelectOpen = () => {
    setAlbumSelectOpen(true);
  };

  const handleSliderClick = (e) => {
    if (sliderRef.current && !sliderRef.current.contains(e.target)) {
      sliderRef.current.classList.remove("slider-open");
      setSliderOpen(false);
    }
  };

  const handleSelectClose = (e) => {
    const $classList = e.target.classList;
    if ($classList.contains("select-component")) {
      setAlbumSelectOpen(false);
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
      <header className="app-buttons">
        <button
          className="app-home-buttom"
          onClick={() => {
            dispatch(setMapRegion("korea"));
          }}
        >
          홈으로
        </button>
        <button className="app-album-buttom" onClick={handleSelectOpen}>
          앨범
        </button>
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
        <section className="map-component">
          <D3Map></D3Map>
        </section>
      </main>
      {albumSelectOpen ? (
        <aside className="select-component" onClick={handleSelectClose}>
          <AlbumSelect />
        </aside>
      ) : null}
      <footer></footer>
    </div>
  );
}

export default App;
