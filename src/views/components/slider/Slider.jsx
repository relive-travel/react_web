import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAddr, getKoreanAddr } from "lib/getAddr";

import { getMarkerAll, getMarkerMatchRegion } from "redux/thunk/markerThunk";
import { getAlbumMatchMarkerId } from "redux/thunk/albumThunk";

import "./Slider.scss";
function Slider(props) {
  const dispatch = useDispatch();

  const [albumInfo, setAlbumInfo] = useState([]);

  const mapRegion = useSelector((state) => state.map.region);
  const sliderListData = useSelector((state) => state.marker.sliderList);

  useEffect(() => {
    if (mapRegion === "korea") {
      dispatch(getMarkerAll());
    } else {
      dispatch(getMarkerMatchRegion(getKoreanAddr(mapRegion)));
    }
  }, [mapRegion]);

  useEffect(() => {
    if (sliderListData) {
      const getAlbumInfo = async () => {
        const info = sliderListData.reduce(async (promise, marker, idx) => {
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
  }, [sliderListData]);
  return (
    <>
      {albumInfo
        .sort((o1, o2) => Date.parse(o2.date) - Date.parse(o1.date))
        .map((info) => {
          return (
            <div className="slider-info" key={info.id}>
              <div className="info-header">
                <div className="info-addr">
                  {getAddr(info.marker.region.addr)}
                </div>
                <div className="info-marker-ea">🥕 1</div>
              </div>
              <div>
                <div className="info-main">
                  <div className="info-date">{info.date}</div>
                  <div className="info-title">{info.title}</div>
                  <div className="info-semi-addr">
                    {info.marker.region.addr +
                      " " +
                      info.marker.region.semiAddr}
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
