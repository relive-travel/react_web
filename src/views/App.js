import "./App.scss";
import KoreaMap from "views/components/map/KoreaMap.jsx";

function App() {
  return (
    <div className="App">
      <header></header>
      <section>
        <KoreaMap className="map-component"></KoreaMap>
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
