import * as d3 from "d3";
import * as topojson from "topojson";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTopoJson, setMapRegion } from "reducers/slice/mapSlice.js";
import { setProjection } from "lib/setProjection.js";
import {
  setSvg,
  setZoomEvent,
  setSvgResetEvent,
  setPathZoomEvent,
} from "lib/setMapElements.js";

import PathElements from "./components/PathElements.jsx";

import "./WorldMap.scss";
function WorldMap(props) {
  var svgRef = useRef(null);
  var gRef = useRef(null);

  const dispatch = useDispatch();

  const mapData = useSelector((state) => state.map.topojson);
  const mapRegion = useSelector((state) => state.map.region);
  const mapOption = useSelector((state) => state.map.option);

  const [drawPath, setDrawPath] = useState(null);

  useEffect(() => {
    dispatch(fetchTopoJson({ region: mapRegion }));
  }, [mapRegion, dispatch]);

  useEffect(() => {
    if (mapOption.width && mapOption.height) {
      setSvg({
        svgCurElement: svgRef.current,
        mapOption,
      });
    }
  }, [mapOption]);

  const setMapViewCountry = () => {
    const geojson = topojson.feature(mapData, mapData.objects.regions);
    const path = d3.geoPath().projection(setProjection({ geojson, mapOption }));

    const regions = geojson.features.map((geo) => {
      return (
        <PathElements
          type={"country"}
          key={geo.properties.CTPRVN_CD}
          name={geo.properties.CTP_ENG_NM}
          pathData={path(geo)}
          onClick={() => {
            dispatch(setMapRegion(geo.properties.CTP_ENG_NM));
          }}
        ></PathElements>
      );
    });
    setDrawPath(regions);
  };

  const setMapViewRegion = () => {
    const zoom = setZoomEvent({ gCurElement: gRef.current });

    const geojson = topojson.feature(mapData, mapData.objects.regions);
    const path = d3.geoPath().projection(setProjection({ geojson, mapOption }));
    const regions = geojson.features.map((geo) => {
      return (
        <PathElements
          type={"region"}
          key={geo.properties.GID}
          name={geo.properties.SGG_NM}
          pathData={path(geo)}
          onClick={setPathZoomEvent({
            curElements: {
              svgCurElement: svgRef.current,
              gCurElement: gRef.current,
            },
            mapOption,
            zoom,
            path,
            geo,
          })}
        ></PathElements>
      );
    });
    setSvgResetEvent({
      curElements: {
        svgCurElement: svgRef.current,
        gCurElement: gRef.current,
      },
      mapOption,
      zoom,
    });
    setDrawPath(regions);
  };

  useEffect(() => {
    if (mapData != null) {
      mapRegion == "korea" ? setMapViewCountry() : setMapViewRegion();
    }
  }, [mapData, mapRegion, mapOption]);

  return (
    <>
      <svg ref={svgRef} className="word-map-canvas">
        <g ref={gRef}>{drawPath}</g>
      </svg>
    </>
  );
}

export default WorldMap;
