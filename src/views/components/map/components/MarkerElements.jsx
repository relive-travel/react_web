import * as topojson from "topojson";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setProjection } from "lib/utils/map/projection";
import { getKoreanAddr } from "lib/utils/data/addr";

import { getMarkerMatchRegion } from "redux/thunk/markerThunk";

import "./MarkerElements.scss";
function MarkerElements(props) {
  const dispatch = useDispatch();

  const mapData = useSelector((state) => state.map.topojson);
  const mapRegion = useSelector((state) => state.map.region);
  const mapOption = useSelector((state) => state.map.option);
  const markerData = useSelector((state) => state.marker.data);
  const markerOption = useSelector((state) => state.marker.option);

  const [drawMarker, setDrawMarker] = useState();

  useEffect(() => {
    if (mapRegion) {
      dispatch(getMarkerMatchRegion({ region: getKoreanAddr(mapRegion) }));
    }
  }, [mapRegion]);

  useEffect(() => {
    if (mapData && markerData) {
      const geojson = topojson.feature(mapData, mapData.objects.regions);
      const projection = setProjection({ geojson, mapOption });
      const markerElements = markerData.map((marker, index) => {
        return (
          <image
            key={`marker-${index}`}
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
  }, [mapData, markerData, markerOption]);

  return <>{drawMarker}</>;
}

export default MarkerElements;
