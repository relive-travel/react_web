import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setMapOption, setMapRegion } from "redux/slice/mapSlice";

import D3Map from "views/components/map/D3Map.jsx";
import Slider from "views/components/slider/Slider.jsx";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import "./App.scss";
function App() {
  const dispatch = useDispatch();

  const [sliderOpen, setSliderOpen] = useState(false);

  const handleOpen = (type) => (e) => {
    const slider = document.querySelector(".slider-component");
    slider.classList.add("open");
    setSliderOpen(type);
  };

  const handleClose = (type) => (e) => {
    const slider = document.querySelector(".slider-component");
    slider.classList.remove("open");
    setSliderOpen(type);
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
    <div className="app-component">
      <header>
        <button
          className="app-home-buttom"
          onClick={() => {
            dispatch(setMapRegion("korea"));
          }}
        >
          홈으로
        </button>
      </header>
      <main>
        <aside className="slider-component">
          <section className="slider-main">
            <Slider></Slider>
          </section>
          <section className="slider-button">
            {sliderOpen ? (
              <KeyboardDoubleArrowLeftIcon onClick={handleClose(false)} />
            ) : (
              <KeyboardDoubleArrowRightIcon onClick={handleOpen(true)} />
            )}
          </section>
        </aside>
        <section>
          <article className="map-component">
            <D3Map></D3Map>
          </article>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
