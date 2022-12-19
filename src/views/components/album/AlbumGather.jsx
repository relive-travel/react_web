import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMarker } from "redux/thunk/markerThunk";
import { getAlbum } from "redux/thunk/albumThunk";
import { getPhotoAll } from "redux/thunk/photoThunk";

import "./AlbumGather.scss";
function AlbumGather(props) {
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
          return {
            ...photo,
            marker: await markerData,
          };
        } else {
          return {
            ...photo,
            album: await albumData,
          };
        }
      })
    );
    console.log(await gatherList);
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
    <section className="album-gather-component">
      <main className="album-gather-main">
        <section className="gather-photos">
          {gatherData?.map((gather, index) => {
            const photoStyle =
              gather.photo.width > gather.photo.height
                ? { height: "100%" }
                : { width: "100%" };
            return (
              <article key={`gather-${index}`}>
                <img
                  className={`gather-${index}`}
                  src={gather.photo.url}
                  style={photoStyle}
                />
              </article>
            );
          })}
        </section>
      </main>
    </section>
  );
}

export default AlbumGather;
