import * as d3 from "d3";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import LeftRabbit from "assets/picture/left_rabbit.png";

import "./MarkerElements.scss";
function MarkerElements(props) {
  const { svgRef, gMarkerRef, proj } = props;
  const markerData = useSelector((state) => state.marker.point);

  useEffect(() => {}, []);

  return <></>;
}

export default MarkerElements;
