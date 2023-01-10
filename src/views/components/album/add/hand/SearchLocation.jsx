import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumSearch } from "redux/slice/albumSlice";
import { setAlbumHandLocationDialog } from "redux/slice/statusSlice";

import { setKakaoMapWithLocation } from "lib/utils/map/kakaoMap";

function SearchLocation(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);
  const kakaoMapRef = useRef(null);

  const [locationRes, setLocationRes] = useState();

  const handleOutsideClick = (e) => {
    e.stopPropagation();
    if (!compRef.current?.contains(e.target)) {
      dispatch(setAlbumHandLocationDialog(false));
    }
  };

  const handleSelectResult = () => {
    let res = {
      latitude: locationRes.latitude,
      longitude: locationRes.longitude,
      addr: locationRes.road_address
        ? locationRes.road_address.address_name
        : locationRes.address.address_name,
      semiAddr: locationRes.road_address
        ? locationRes.road_address.building_name
        : null,
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
    <section className="search-location-component" onClick={handleOutsideClick}>
      <article ref={compRef}>
        <section className="search-location-main">
          <main>
            <section className="kakao-map-info" ref={kakaoMapRef}></section>
          </main>
          <footer>
            <button
              className="location-select-button"
              onClick={handleSelectResult}
            >
              선택
            </button>
          </footer>
        </section>
      </article>
    </section>
  );
}
export default SearchLocation;
