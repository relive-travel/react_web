import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAlbumSearch } from "redux/slice/albumSlice";
import { setAlbumChangeModal } from "redux/slice/statusSlice";

import { setKakaoMapWithGeoPoint } from "lib/setKakaoMap";

import DragAndDrop from "views/components/album/add/auto/DragAndDrop";

import "./AutoAdd.scss";
function AutoAdd(props) {
  const dispatch = useDispatch();

  const kakaoMapRef = useRef(null);

  const photoFile = useSelector((state) => state.photo.file);
  const photoData = useSelector((state) => state.photo.data);

  const handleSetKakaoMap = async () => {
    const res = setKakaoMapWithGeoPoint({
      mapContainer: kakaoMapRef.current,
      latitude: photoData.exifdata.latitude,
      longitude: photoData.exifdata.longitude,
    });
    const addr = await res;
    if (addr.road_address) {
      props.addrRef.current.value = addr.road_address.address_name;
      props.semiAddrRef.current.value = addr.road_address.building_name;
    } else {
      props.addrRef.current.value = addr.address.address_name;
    }
    dispatch(
      setAlbumSearch({
        latitude: photoData.exifdata.latitude,
        longitude: photoData.exifdata.longitude,
        addr: props.addrRef.current.value,
        semiAddr: props.semiAddrRef.current.value,
      })
    );
  };

  const handleResizeHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  useEffect(() => {
    if (photoData) {
      if (photoData.exifdata !== null) {
        var [date, time] = photoData.exifdata.date.split(" ");
        time = time.slice(0, time.length - 3);
        props.dateRef.current.value = [date, time].join("T");

        handleSetKakaoMap();
      } else {
        dispatch(setAlbumChangeModal(true));
      }
    }
  }, [photoData]);

  return (
    <section className="album-auto-info">
      <header className="info-header">
        <section className="info-title">
          <label htmlFor="title">
            제목<span>(*)</span>
          </label>
          <input type="text" id="title" ref={props.titleRef}></input>
        </section>
        <section className="info-content">
          <label htmlFor="content">이야기</label>
          <textarea
            id="content"
            rows={1}
            spellCheck="false"
            ref={props.contentRef}
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
            <DragAndDrop
              dragType="auto"
              photoRef={props.photoRef}
              previewRef={props.previewRef}
            ></DragAndDrop>
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
                날짜<span>(*)</span>
              </label>
              <input
                id="date"
                type="datetime-local"
                readOnly
                ref={props.dateRef}
              ></input>
            </article>
            <article className="info-addr">
              <label htmlFor="addr">
                주소 확인<span>(*)</span>
              </label>
              <input id="addr" type="text" readOnly ref={props.addrRef}></input>
            </article>
            <article className="info-semi-addr">
              <label htmlFor="semi-addr">추가 정보</label>
              <input id="semi-addr" type="text" ref={props.semiAddrRef}></input>
            </article>
          </section>
        ) : null}
      </main>
    </section>
  );
}
export default AutoAdd;
