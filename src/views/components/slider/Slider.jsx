import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAddress, koreanAddress } from "lib/setAddress";

import { getMarkerAll, getMarkerMatchRegion } from "redux/thunk/markerThunk";
import { getAlbumMatchMarkerId } from "redux/thunk/albumThunk";

import "./Slider.scss";
function Slider(props) {
  const dispatch = useDispatch();

  const [albumInfo, setAlbumInfo] = useState([]);

  const mapRegion = useSelector((state) => state.map.region);
  const markerList = useSelector((state) => state.marker.list);

  useEffect(() => {
    if (mapRegion === "korea") {
      dispatch(getMarkerAll());
    } else {
      dispatch(getMarkerMatchRegion(koreanAddress(mapRegion)));
    }
  }, [mapRegion]);

  useEffect(() => {
    if (markerList) {
      const getAlbumInfo = async () => {
        const info = markerList.reduce(async (promise, marker, idx) => {
          let albumAcc = await promise;

          const albumData = await dispatch(
            getAlbumMatchMarkerId({ id: marker.id })
          ).then((response) => {
            return response.payload;
          });

          return albumData
            ? [
                ...albumAcc,
                ...albumData.map((album) => {
                  return {
                    ...album,
                    marker,
                  };
                }),
              ]
            : [];
        }, []);
        setAlbumInfo(await info);
      };
      getAlbumInfo();
    }
  }, [markerList]);
  return (
    <>
      {albumInfo
        .sort((o1, o2) => Date.parse(o2.date) - Date.parse(o1.date))
        .map((info) => {
          return (
            <div className="slider-info" key={info.id}>
              <div className="info-header">
                <div className="info-address">
                  {getAddress(info.marker.region.address)}
                </div>
                <div className="info-marker-ea">🥕 1</div>
              </div>
              <div>
                <div className="info-main">
                  <div className="info-date">{info.date}</div>
                  <div className="info-title">{info.title}</div>
                  <div className="info-semi-address">
                    {info.marker.region.address +
                      " " +
                      info.marker.region.semiAddress}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
export default Slider;
