import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAlbumSelectModal } from "redux/slice/statusSlice";
import { setMapOption, setMapRegion } from "redux/slice/mapSlice";

import D3Map from "views/components/map/D3Map.jsx";
import Slider from "views/components/slider/Slider.jsx";
import AlbumSelect from "./components/modal/AlbumSelect";
import AlbumCreate from "./components/album/AlbumCreate";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import "./App.scss";
function App() {
  const dispatch = useDispatch();

  const sliderRef = useRef(null);

  const [sliderOpen, setSliderOpen] = useState(false);

  const selectStatus = useSelector((state) => state.status.modal.select);
  const createStatus = useSelector((state) => state.status.dialog.create);

  const handleSliderOpen = () => {
    sliderRef.current.classList.add("slider-open");
    setSliderOpen(true);
  };

  const handleSliderClose = () => {
    sliderRef.current.classList.remove("slider-open");
    setSliderOpen(false);
  };

  const handleSliderClick = (e) => {
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
      <header className="app-buttons">
        <button
          className="app-home-buttom"
          onClick={() => {
            dispatch(setMapRegion("korea"));
          }}
        >
          홈으로
        </button>
        <button
          className="app-album-buttom"
          onClick={() => {
            dispatch(setAlbumSelectModal(true));
          }}
        >
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
      <aside>
        {selectStatus ? <AlbumSelect /> : null}
        {createStatus ? <AlbumCreate /> : null}
      </aside>
      <footer></footer>
    </div>
  );
}

export default App;
