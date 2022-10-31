import * as d3 from "d3";
import * as topojson from "topojson";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTopoJson, setMapOption } from "reducers/slice/mapSlice.js";
import { setProjection } from "lib/setProjection.js";

import PathElements from "./components/PathElements.jsx";

import "./WorldMap.scss";
function WorldMap(props) {
  // var svgRef = useRef(null);

  const dispatch = useDispatch();

  // const mapData = useSelector((state) => state.map.topojson);
  const [mapData, setMapData] = useState();
  const mapOption = useSelector((state) => state.map.option);

  const [drawPath, setDrawPath] = useState(null);

  useEffect(() => {
    function fetchTopoJson() {
      fetch(
        `https://relivetravle.s3.ap-northeast-2.amazonaws.com/${mapOption.region}.json`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setMapData(data);
        });
    }
    fetchTopoJson();
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     fetchTopoJson({ region: mapOption.region, type: mapOption.type })
  //   );
  // }, [mapOption.region, mapOption.type, dispatch]);

  useEffect(() => {
    if (mapData != null) {
      // const currentElement = svgRef.current;

      console.log(mapData);

      const geojson = topojson.feature(mapData, mapData.objects.regions);

      console.log(geojson);
      const path = d3
        .geoPath()
        .projection(setProjection({ geojson, mapOption }));
      const regions = geojson.features.map((geo) => {
        return (
          // <PathElements
          //   key={geo.properties.GID}
          //   path={path}
          //   data={geojson}
          //   className={geo.properties.SGG_NM}
          //   title={geo.properties.SGG_NM}
          // ></PathElements>
          <PathElements
            key={geo.properties.CTPRVN_CD}
            className={geo.properties.CTP_ENG_NM}
            path={path(geo)}
            title={geo.properties.CTP_KOR_NM}
          ></PathElements>
        );
      });
      setDrawPath(regions);
    }
  }, [mapData]);

  return (
    <>
      <svg className="word-map-canvas">
        <g>{drawPath}</g>
      </svg>
    </>
  );
}

export default WorldMap;
