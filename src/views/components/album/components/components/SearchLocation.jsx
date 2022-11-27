import { useEffect, useRef } from "react";

import { setKakaoMapWithLocation } from "lib/setKakaoMap";

import "./SearchLocation.scss";
function SearchLocation(props) {
  const compRef = useRef(null);
  const kakaoMapRef = useRef(null);

  const handleSearchClick = (e) => {
    if (compRef.current && !compRef.current.contains(e.target)) {
      props.handleSearchClose("location");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setKakaoMapWithLocation(
          {
            mapContainer: kakaoMapRef.current,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          (markerInfo) => {
            console.log(markerInfo);
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
          <button>선택</button>
        </section>
      </article>
    </section>
  );
}
export default SearchLocation;
