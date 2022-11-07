import "./App.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCoordinates } from "lib/setFilrebase";
import { setMapOption, setMapRegion } from "redux/slice/mapSlice";

import D3Map from "views/components/map/D3Map.jsx";
function App() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    getCoordinates().then((response) => {
      response.map((res) => {
        console.log(res.latitude);
        console.log(res.longitude);
      });
    });
  }, []);

  return (
    <div className="App">
      <header>
        <button
          onClick={() => {
            dispatch(setMapRegion("korea"));
          }}
        >
          홈으로
        </button>
      </header>
      <section>
        <D3Map className="map-component"></D3Map>
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
