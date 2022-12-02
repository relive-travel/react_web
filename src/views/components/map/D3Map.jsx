import * as d3 from "d3";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTopoJson } from "redux/thunk/mapThunk.js";

import { setSvg, setZoomEvent, setSvgResetEvent } from "lib/setMapEvent.js";

import PathElements from "./components/PathElements.jsx";
import MarkerElements from "./components/MarkerElements.jsx";

import "./D3Map.scss";
function D3Map(props) {
  var svgRef = useRef(null);
  var gPathRef = useRef(null);

  const dispatch = useDispatch();

  const mapRegion = useSelector((state) => state.map.region);
  const mapOption = useSelector((state) => state.map.option);

  // svg 세팅할때, 그리고 Path를 설정하기전에 지역데이터 받아와야함
  useEffect(() => {
    dispatch(fetchTopoJson({ region: mapRegion }));
  }, [mapRegion, dispatch]);

  // svg 세팅
  useEffect(() => {
    if (mapOption) {
      setSvg({
        svgCurElement: svgRef.current,
        mapOption,
      });
    }
  }, [mapOption]);

  // svg zoom 세팅
  useEffect(() => {
    if (mapOption) {
      const zoom = setZoomEvent({ gCurElement: gPathRef.current });

      // d3 svg 내부 사용자 마우스 zoom 이벤트 할당
      d3.select(svgRef.current).call(zoom);

      // svg 배경 클릭 시 zoom reset
      setSvgResetEvent({
        curElements: {
          svgCurElement: svgRef.current,
          gCurElement: gPathRef.current,
        },
        mapOption,
        zoom,
      });
    }
  }, [mapRegion, mapOption]);

  return (
    <>
      <svg ref={svgRef} className="map-main">
        <g ref={gPathRef}>
          <PathElements svgRef={svgRef} gPathRef={gPathRef}></PathElements>
          {mapRegion !== "korea" ? (
            <MarkerElements
              svgRef={svgRef}
              gPathRef={gPathRef}
            ></MarkerElements>
          ) : null}
        </g>
      </svg>
    </>
  );
}

export default D3Map;
