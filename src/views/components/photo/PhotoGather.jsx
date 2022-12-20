import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPhotoGather } from "redux/slice/photoSlice";

import { getMarker } from "redux/thunk/markerThunk";
import { getAlbum } from "redux/thunk/albumThunk";
import { getPhotoAll } from "redux/thunk/photoThunk";

import { groupDate } from "lib/utils/jsUtils";

import "./PhotoGather.scss";
function PhotoGather(props) {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const allData = useSelector((state) => state.photo.all);
  const gatherData = useSelector((state) => state.photo.gather);

  const sortStatus = useSelector((state) => state.status.option.sort);

  const handleGetGatherData = async () => {
    const gatherList = Promise.all(
      allData.map(async (photo) => {
        let albumData, markerData;
        albumData = dispatch(getAlbum({ id: photo.albumId })).then(
          (response) => {
            return response.payload;
          }
        );
        if (sortStatus) {
          markerData = dispatch(getMarker({ id: albumData.markerId })).then(
            (response) => {
              return response.payload;
            }
          );
        }
        return sortStatus
          ? {
              photo,
              marker: await markerData,
            }
          : {
              photo,
              album: await albumData,
            };
      })
    );
    const gatherGroup = groupDate(await gatherList);
    dispatch(setPhotoGather(Object.entries(gatherGroup).sort()));
  };

  useEffect(() => {
    dispatch(getPhotoAll({ userId: userId }));
  }, []);

  useEffect(() => {
    if (allData) {
      handleGetGatherData();
    }
  }, [allData]);

  return (
    <section className="photo-gather-component">
      <main className="photo-gather-main">
        {gatherData?.map(([date, gather], index) => {
          return (
            <>
              <section className="gather-date" key={date}>
                {date}
              </section>
              <section className="gather-photos" key={`${date}-photos`}>
                {gather.map(({ photo, album }, idx) => {
                  const photoStyle =
                    photo.width > photo.height
                      ? { height: "100%" }
                      : { width: "100%" };
                  // photoStyle은 공통
                  // sortStatus : false = album => date
                  // sortStatus : true = marker => region
                  return (
                    <article key={`gather-photo-${idx}`}>
                      <img
                        className={`gather-photo-${idx}`}
                        src={photo.url}
                        style={photoStyle}
                        alt={album.title}
                        loading="lazy"
                      />
                    </article>
                  );
                })}
              </section>
            </>
          );
        })}
      </main>
    </section>
  );
}

export default PhotoGather;
