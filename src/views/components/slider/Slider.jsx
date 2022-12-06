import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAddr, getKoreanAddr } from "lib/get/addr";

import { getMarkerAll, getMarkerMatchRegion } from "redux/thunk/markerThunk";
import { getAlbumMatchMarkerId } from "redux/thunk/albumThunk";
import { getPhotoMatchAlbumId } from "redux/thunk/photoThunk";

import "./Slider.scss";
function Slider(props) {
  const dispatch = useDispatch();

  const [albumInfo, setAlbumInfo] = useState([]);

  const mapRegion = useSelector((state) => state.map.region);
  const sliderData = useSelector((state) => state.marker.list);

  useEffect(() => {
    if (mapRegion === "korea") {
      dispatch(getMarkerAll());
    } else {
      dispatch(getMarkerMatchRegion(getKoreanAddr(mapRegion)));
    }
  }, [mapRegion]);

  const handleGetAlbumInfo = async () => {
    const info = sliderData.reduce(async (promise, marker, idx) => {
      let albumAcc = await promise;

      const albumData = await dispatch(
        getAlbumMatchMarkerId({ markerId: marker.id })
      ).then((albumResponse) => {
        return Promise.all(
          albumResponse.payload.map(async (album) => {
            const photoData = await dispatch(
              getPhotoMatchAlbumId({ albumId: album.id })
            ).then((photoResponse) => {
              return photoResponse.payload;
            });
            return {
              ...album,
              photo: photoData,
            };
          })
        );
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

  useEffect(() => {
    if (sliderData) {
      handleGetAlbumInfo();
    }
  }, [sliderData]);
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
                <div className="info-marker-ea">
                  <span>{info.photo.length}</span>
                  <span>🥕</span>
                </div>
              </div>
              <div>
                <div className="info-main">
                  <div className="info-date">{info.date}</div>
                  <div className="info-title">{info.title}</div>
                  <div className="info-semi-addr">
                    {info.marker.region.addr} {info.marker.region.semiAddr}
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
