import * as d3 from "d3";
import * as topojson from "topojson";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMapRegion } from "redux/slice/mapSlice";

import { setZoomEvent, setPathZoomEvent } from "lib/utils/mapEvent";
import { setProjection } from "lib/get/projection";

import "./PathElements.scss";
function PathElements(props) {
  const { svgRef, gPathRef } = props;

  const dispatch = useDispatch();

  const mapData = useSelector((state) => state.map.topojson);
  const mapRegion = useSelector((state) => state.map.region);
  const mapOption = useSelector((state) => state.map.option);

  const [drawPath, setDrawPath] = useState();

  useEffect(() => {
    if (mapData) {
      const zoom = setZoomEvent({ gCurElement: gPathRef.current });

      const geojson = topojson.feature(mapData, mapData.objects.regions);
      const path = d3
        .geoPath()
        .projection(setProjection({ geojson, mapOption }));

      const pathElements = geojson.features.map((geo) => {
        return (
          <path
            className="path"
            key={
              mapRegion === "korea"
                ? geo.properties.CTPRVN_CD
                : geo.properties.GID
            }
            name={
              mapRegion === "korea"
                ? geo.properties.CTP_ENG_NM
                : geo.properties.SGG_NM
            }
            d={path(geo)}
            onClick={
              mapRegion === "korea"
                ? () => dispatch(setMapRegion(geo.properties.CTP_ENG_NM))
                : setPathZoomEvent({
                    curElements: {
                      svgCurElement: svgRef.current,
                      gCurElement: gPathRef.current,
                    },
                    mapOption,
                    zoom,
                    path,
                    geo,
                  })
            }
          ></path>
        );
      });
      setDrawPath(pathElements);
    }
  }, [mapData, mapOption]);

  return <>{drawPath}</>;
}

export default PathElements;
