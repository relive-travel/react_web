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
} from "lib/setMapEvent.js";

import PathElements from "./components/PathElements.jsx";

import "./D3Map.scss";
function D3Map(props) {
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

  const setMapViewCountry = (geojson, path) => {
    return geojson.features.map((geo) => {
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
  };

  const setMapViewRegion = (geojson, zoom, path) => {
    setSvgResetEvent({
      curElements: {
        svgCurElement: svgRef.current,
        gCurElement: gRef.current,
      },
      mapOption,
      zoom,
    });
    return geojson.features.map((geo) => {
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
  };

  useEffect(() => {
    if (mapData != null) {
      const zoom = setZoomEvent({ gCurElement: gRef.current });

      const geojson = topojson.feature(mapData, mapData.objects.regions);
      const path = d3
        .geoPath()
        .projection(setProjection({ geojson, mapOption }));

      setDrawPath(
        mapRegion == "korea"
          ? setMapViewCountry(geojson, path)
          : setMapViewRegion(geojson, zoom, path)
      );

      // d3 svg 내부 사용자 마우스 zoom 이벤트 할당
      d3.select(svgRef.current).call(zoom);
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

export default D3Map;
