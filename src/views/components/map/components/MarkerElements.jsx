import * as topojson from "topojson";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setProjection } from "lib/utils/map/projection";
import { getKoreanAddr } from "lib/utils/data/addr";

import { getMarkerAllMatchRegion } from "redux/thunk/markerThunk";

function MarkerElements(props) {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);

  const mapData = useSelector((state) => state.map.topojson);
  const mapRegion = useSelector((state) => state.map.region);
  const mapOption = useSelector((state) => state.map.option);
  const markerData = useSelector((state) => state.marker.data);
  const markerOption = useSelector((state) => state.marker.option);

  const [drawMarker, setDrawMarker] = useState();

  useEffect(() => {
    if (userId && mapRegion) {
      dispatch(
        getMarkerAllMatchRegion({
          userId: userId,
          region: getKoreanAddr(mapRegion),
        })
      );
    }
  }, [userId, mapRegion]);

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
              markerOption.height
            })`}
            width={markerOption.width}
            height={markerOption.height}
            xlinkHref={markerOption.url}
          ></image>
        );
      });
      setDrawMarker(markerElements);
    }
  }, [mapData, mapOption, markerData, markerOption]);

  return <>{drawMarker}</>;
}

export default MarkerElements;
