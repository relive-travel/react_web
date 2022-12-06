import * as topojson from "topojson";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setProjection } from "lib/get/projection";
import { getKoreanAddr } from "lib/get/addr";

import { getMarkerMatchRegion } from "redux/thunk/markerThunk";

import "./MarkerElements.scss";
function MarkerElements(props) {
  const dispatch = useDispatch();

  const mapData = useSelector((state) => state.map.topojson);
  const mapRegion = useSelector((state) => state.map.region);
  const mapOption = useSelector((state) => state.map.option);
  const markerList = useSelector((state) => state.marker.list);
  const markerOption = useSelector((state) => state.marker.option);

  const [drawMarker, setDrawMarker] = useState();

  useEffect(() => {
    if (mapRegion) {
      dispatch(getMarkerMatchRegion({ region: getKoreanAddr(mapRegion) }));
    }
  }, [mapRegion]);

  useEffect(() => {
    if (mapData && markerList) {
      const geojson = topojson.feature(mapData, mapData.objects.regions);
      const projection = setProjection({ geojson, mapOption });
      const markerElements = markerList.map((marker, index) => {
        return (
          <image
            key={index}
            transform={`translate(${
              projection([marker.point._long, marker.point._lat])[0] -
              markerOption.width / 2
            }, ${
              projection([marker.point._long, marker.point._lat])[1] -
              markerOption.height / 2
            })`}
            width={markerOption.width}
            height={markerOption.height}
            xlinkHref={markerOption.url}
          ></image>
        );
      });
      setDrawMarker(markerElements);
    }
  }, [mapData, markerList]);

  return <>{drawMarker}</>;
}

export default MarkerElements;
