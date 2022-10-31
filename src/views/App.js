import "./App.scss";
import Sample from "views/components/sample/MapSample.jsx";
import WorldMap from "views/components/map/WorldMap.jsx";

function App() {
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
