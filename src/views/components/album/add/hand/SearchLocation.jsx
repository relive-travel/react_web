import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumSearch } from "redux/slice/albumSlice";
import { setAlbumHandLocationDialog } from "redux/slice/statusSlice";

import { setKakaoMapWithLocation } from "lib/setKakaoMap";

import "./SearchLocation.scss";
function SearchLocation(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);
  const kakaoMapRef = useRef(null);

  const [locationRes, setLocationRes] = useState();

  const handleSearchClick = (e) => {
    if (compRef.current && !compRef.current.contains(e.target)) {
      dispatch(setAlbumHandLocationDialog(false));
    }
  };

  const handleSelectResult = () => {
    let res = locationRes.road_address
      ? {
          latitude: locationRes.latitude,
          longitude: locationRes.longitude,
          addr: locationRes.road_address.address_name,
          semiAddr: locationRes.road_address.building_name,
        }
      : {
          latitude: locationRes.latitude,
          longitude: locationRes.longitude,
          addr: locationRes.address.address_name,
        };
    dispatch(setAlbumSearch(res));
    dispatch(setAlbumHandLocationDialog(false));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setKakaoMapWithLocation(
          {
            mapContainer: kakaoMapRef.current,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          (locationResult) => {
            setLocationRes(locationResult);
          }
        );
      });
    }
  }, []);

  return (
    <section className="location-component" onClick={handleSearchClick}>
      <article ref={compRef}>
        <section className="location-preview">
          <section className="kakao-map-location" ref={kakaoMapRef}></section>
          <button onClick={handleSelectResult}>선택</button>
        </section>
      </article>
    </section>
  );
}
export default SearchLocation;
