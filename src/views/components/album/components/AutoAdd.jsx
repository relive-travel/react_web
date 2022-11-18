import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import DragAndDrop from "views/common/DragAndDrop";

import "./AutoAdd.scss";
function AutoAdd(props) {
  const photoFile = useSelector((state) => state.photo.file);
  const photoData = useSelector((state) => state.photo.data);

  useEffect(() => {
    if (photoFile) {
      console.log(photoFile);
    }
  }, [photoFile]);

  useEffect(() => {
    if (photoData) {
      const $inputDate = document.querySelector(
        `.info-date > input[type="datetime-local"]`
      );
      // $inputDate.value = photoData.exifdata.date.split(" ").join("T");
      var [date, time] = photoData.exifdata.date.split(" ");
      time = time.slice(0, time.length - 3);
      $inputDate.value = [date, time].join("T");
    }
  }, [photoData]);

  return (
    <section className="album-auto-info">
      <header className="info-header">
        <label htmlFor="title">당근 제목</label>
        <input type="text" id="title"></input>
      </header>
      <main className="info-main">
        <section className="info-main-top">
          <div className="info-photo">
            <label htmlFor="photo">
              <span>*사진</span>
            </label>
            <DragAndDrop></DragAndDrop>
          </div>
          <div className="info-location">
            <label htmlFor="location">위치</label>
            <div id="location"></div>
          </div>
        </section>
        {photoData ? (
          <section className="info-main-bottom">
            <div className="info-date">
              <label htmlFor="date">
                <span>*날짜</span>
              </label>
              <input id="date" type="datetime-local" readOnly></input>
            </div>
            <div className="info-address">
              <label htmlFor="address">주소 확인</label>
              <input id="address" type="text"></input>
            </div>
            <div className="info-semi-address">
              <label htmlFor="semi-address">추가 주소 정보</label>
              <input id="semi-address" type="text"></input>
            </div>
          </section>
        ) : null}
      </main>
      <footer className="info-footer">
        <label htmlFor="content">당근 이야기</label>
        <input id="content" type="textarea"></input>
      </footer>
    </section>
  );
}
export default AutoAdd;
