import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { koreanAddress } from "lib/setAddress";

import { getMarkerAll, getMarkerMatchRegion } from "redux/thunk/markerThunk";
import { getAlbumMatchMarkerId } from "redux/thunk/albumThunk";

import "./Slider.scss";
function Slider(props) {
  const dispatch = useDispatch();

  const [albumInfo, setAlbumInfo] = useState([]);

  const mapRegion = useSelector((state) => state.map.region);
  const markerList = useSelector((state) => state.marker.list);

  /* 
    마커 전체 리스트 조회
    개별 마커 id와 일치하는 albums join
    개별 앨범 id와 일치하는 photos join 
   */

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

          return [
            ...albumAcc,
            ...albumData.map((album) => {
              return {
                ...album,
                marker,
              };
            }),
          ];
        }, []);
        setAlbumInfo(await info);
      };
      getAlbumInfo();
    }
  }, [markerList]);
  return (
    <>
      {albumInfo.map((info) => {
        return (
          <div className="slider-info" key={info.id}>
            <div className="info-header">
              <div className="info-address">여기가 주소가 적힐 공간이에요</div>
              <div className="info-marker-ea">🥕 153</div>
            </div>
            <div>
              <div className="info-main">
                <div className="info-date">2022-10-21</div>
                <div className="info-title">여기가 제목이랍니다</div>
                <div className="info-semi-address">
                  상세한 주소는 우리집 주소를 참고하세요
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
