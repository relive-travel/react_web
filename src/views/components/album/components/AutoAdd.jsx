import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

import { setKakaoMapWithGeoPoint } from "lib/setKakaoMap";

import DragAndDrop from "views/components/album/components/components/DragAndDrop";

import "./AutoAdd.scss";
function AutoAdd(props) {
  var textRef = useRef(null);
  var dateRef = useRef(null);
  var addrRef = useRef(null);
  var semiAddrRef = useRef(null);
  var kakaoMapRef = useRef(null);

  const [photoAddr, setPhotoAddr] = useState(null);

  const photoFile = useSelector((state) => state.photo.file);
  const photoData = useSelector((state) => state.photo.data);

  const setInputDate = (exifdate) => {
    var [date, time] = exifdate.split(" ");
    time = time.slice(0, time.length - 3);
    dateRef.current.value = [date, time].join("T");
  };

  const handleSetKakaoMap = useCallback(async () => {
    const res = setKakaoMapWithGeoPoint({
      mapContainer: kakaoMapRef.current,
      latitude: photoData.exifdata.latitude,
      longitude: photoData.exifdata.longitude,
    });
    setPhotoAddr(await res);
  });

  const handleResizeHeight = (e) => {
    console.log(e.target.scrollHeight);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  useEffect(() => {
    if (photoFile) {
      console.log(photoFile);
    }
  }, [photoFile]);

  useEffect(() => {
    if (photoData) {
      setInputDate(photoData.exifdata.date);
      handleSetKakaoMap();
    }
  }, [photoData]);

  useEffect(() => {
    if (photoAddr) {
      addrRef.current.value = photoAddr.road_address.address_name;
      semiAddrRef.current.value = photoAddr.road_address.building_name;
    }
  }, [photoAddr]);

  return (
    <section className="album-auto-info">
      <header className="info-header">
        <section className="info-title">
          <label htmlFor="title">제목</label>
          <input type="text" id="title"></input>
        </section>
        <section className="info-content">
          <label htmlFor="content">이야기</label>
          <textarea
            id="content"
            rows={1}
            ref={textRef}
            spellCheck="false"
            autoCorrect="on"
            onChange={handleResizeHeight}
          ></textarea>
        </section>
      </header>
      <main className="info-main">
        <section className="info-main-top">
          <article className="info-photo">
            <label htmlFor="photo">
              사진<span>(*)</span>
            </label>
            <DragAndDrop dragType="auto"></DragAndDrop>
          </article>
          {photoData ? (
            <article className="info-location">
              <label htmlFor="location">위치</label>
              <section
                className="kakao-map-auto"
                id="location"
                ref={kakaoMapRef}
              ></section>
            </article>
          ) : null}
        </section>
        {photoData ? (
          <section className="info-main-bottom">
            <article className="info-date">
              <label htmlFor="date">
                <span>*날짜</span>
              </label>
              <input
                id="date"
                type="datetime-local"
                ref={dateRef}
                readOnly
              ></input>
            </article>
            <article className="info-address">
              <label htmlFor="address">주소 확인</label>
              <input id="address" type="text" ref={addrRef}></input>
            </article>
            <article className="info-semi-address">
              <label htmlFor="semi-address">추가 주소 정보</label>
              <input id="semi-address" type="text" ref={semiAddrRef}></input>
            </article>
          </section>
        ) : null}
      </main>
      {/* <footer className="info-footer">

      </footer> */}
    </section>
  );
}
export default AutoAdd;
