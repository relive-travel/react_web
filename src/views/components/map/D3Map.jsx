import * as d3 from "d3";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTopoJson } from "redux/thunk/mapThunk.js";

import {
  setSvg,
  setZoomEvent,
  setSvgResetEvent,
  setZoomOutEvent,
} from "lib/utils/svgEvent.js";

import PathElements from "./components/PathElements.jsx";
import MarkerElements from "./components/MarkerElements.jsx";
import TextElements from "./components/TextElements.jsx";

import "./D3Map.scss";
function D3Map(props) {
  var svgRef = useRef(null);
  var gPathRef = useRef(null);

  const dispatch = useDispatch();

  const viewOptionStatus = useSelector((state) => state.status.option.view);

  const mapRegion = useSelector((state) => state.map.region);
  const mapOption = useSelector((state) => state.map.option);

  // svg zoom end event callback
  const handleScaleChange = (scale) => {
    console.log(scale);
  };

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
      // d3 svg 내부 사용자 마우스 zoom 이벤트 할당
      d3.select(svgRef.current).call(
        setZoomEvent({ gCurElement: gPathRef.current }, handleScaleChange)
      );

      // svg 배경 클릭 시 zoom reset
      setSvgResetEvent({
        curElements: {
          svgCurElement: svgRef.current,
          gCurElement: gPathRef.current,
        },
        mapOption,
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
          {viewOptionStatus ? <TextElements /> : null}
        </g>
      </svg>
    </>
  );
}

export default D3Map;
