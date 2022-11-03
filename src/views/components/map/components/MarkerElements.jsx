import * as d3 from "d3";
import * as topojson from "topojson";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { setProjection } from "lib/setProjection";

import "./MarkerElements.scss";
function MarkerElements(props) {
  const { svgRef, gPathRef } = props;

  const mapData = useSelector((state) => state.map.topojson);
  const mapOption = useSelector((state) => state.map.option);
  const markerData = useSelector((state) => state.marker.point);
  const markerOption = useSelector((state) => state.marker.option);

  const [drawMarker, setDrawMarker] = useState();

  useEffect(() => {
    if (mapData) {
      const geojson = topojson.feature(mapData, mapData.objects.regions);
      const projection = setProjection({ geojson, mapOption });
      const markerElements = markerData.map((marker) => {
        return (
          <image
            transform={`translate(${
              projection([marker.long, marker.lat])[0] - markerOption.width / 2
            }, ${
              projection([marker.long, marker.lat])[1] - markerOption.height / 2
            })`}
            width={markerOption.width}
            height={markerOption.height}
            xlinkHref={markerOption.url}
          ></image>
        );
      });
      setDrawMarker(markerElements);
    }
  }, [mapData, markerData]);

  return <>{drawMarker}</>;
}

export default MarkerElements;
