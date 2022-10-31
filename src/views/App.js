import "./App.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setMapOption, setMapRegion } from "reducers/slice/mapSlice";

import WorldMap from "views/components/map/WorldMap.jsx";
import Sample from "views/components/sample/MapSample.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.onresize = function () {
      dispatch(
        setMapOption({ width: window.innerWidth, height: window.innerHeight })
      );
    };
    dispatch(setMapRegion("korea"));
  }, []);

  return (
    <div className="App">
      <header></header>
      <section>
        {/* <Sample className="sample-map-component"></Sample> */}
        <WorldMap className="map-component"></WorldMap>
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
