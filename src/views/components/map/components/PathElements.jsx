import * as d3 from "d3";
import * as topojson from "topojson";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMapRegion, setMapText } from "redux/slice/mapSlice";

import { setPathZoomEvent } from "lib/utils/map/svgEvent";
import { setProjection } from "lib/utils/map/projection";
import { getKoreanAddr } from "lib/utils/data/addr";

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
      const geojson = topojson.feature(mapData, mapData.objects.regions);
      const projection = setProjection({ geojson, mapOption });
      const path = d3.geoPath().projection(projection);

      const pathElements = geojson.features.map((geo) => {
        const pathCenter = path.centroid(geo);
        const pathInfo = {
          translate: `translate(${pathCenter})`,
          name:
            mapRegion === "korea"
              ? getKoreanAddr(geo.properties.CTP_ENG_NM)
              : geo.properties.SGG_NM,
          key:
            mapRegion === "korea"
              ? geo.properties.CTPRVN_CD
              : geo.properties.GID,
        };
        dispatch(setMapText(pathInfo));
        return (
          <path
            className="path"
            key={`path-${
              mapRegion === "korea"
                ? geo.properties.CTPRVN_CD
                : geo.properties.GID
            }`}
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
