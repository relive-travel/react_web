import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPhotoGather } from "redux/slice/photoSlice";
import { setDialGatherOption } from "redux/slice/statusSlice";

import { getMarker } from "redux/thunk/markerThunk";
import { getAlbum } from "redux/thunk/albumThunk";
import { getPhotoAll } from "redux/thunk/photoThunk";

import { groupSortType } from "lib/utils/jsUtils";

import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

function PhotoGather(props) {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const allData = useSelector((state) => state.photo.all);
  const gatherData = useSelector((state) => state.photo.gather);

  const sortOptionStatus = useSelector((state) => state.status.option.sort);

  const handleGetGatherData = async () => {
    const gatherList = Promise.all(
      allData.map(async (photo) => {
        const albumData = dispatch(getAlbum({ id: photo.albumId })).then(
          (response) => {
            return response.payload;
          }
        );
        const markerData = dispatch(
          getMarker({ id: (await albumData).markerId })
        ).then((response) => {
          return response.payload;
        });
        return {
          photo,
          album: await albumData,
          marker: await markerData,
        };
      })
    );
    const gatherGroup = groupSortType({
      array: await gatherList,
      type: sortOptionStatus,
    });

    dispatch(
      setPhotoGather(
        Object.entries(gatherGroup)
          .sort()
          .reverse()
          .map(([key, values]) => {
            return [
              key,
              values.sort((a, b) => b.album.date.localeCompare(a.album.date)),
            ];
          })
      )
    );
  };

  useEffect(() => {
    if (userId) {
      dispatch(getPhotoAll({ userId: userId }));
    }
  }, [userId]);

  useEffect(() => {
    if (allData) {
      handleGetGatherData();
    }
  }, [allData, sortOptionStatus]);

  return (
    <section className="photo-gather-component">
      <main className="photo-gather-main">
        {gatherData?.map(([keyData, gather]) => {
          return (
            <article key={keyData}>
              <header
                className={`gather-${sortOptionStatus ? "region" : "date"}`}
              >
                🥕 {keyData}
              </header>
              <main className="gather-photos" key={`${keyData}-photos`}>
                {gather.map(({ photo, album, marker }, idx) => {
                  const photoStyle =
                    photo.width > photo.height
                      ? { height: "100%" }
                      : { width: "100%" };
                  return (
                    <article key={`${keyData}-photo-${idx}`}>
                      <img
                        className="gather-photo"
                        src={photo.url}
                        style={photoStyle}
                        alt={album.title}
                        title={`${album.date}\n${album.title}`}
                        loading="lazy"
                      />
                    </article>
                  );
                })}
              </main>
            </article>
          );
        })}
      </main>
      <aside
        className="gather-close"
        onClick={() => {
          dispatch(setDialGatherOption(false));
        }}
      >
        <CloseFullscreenIcon />
      </aside>
    </section>
  );
}

export default PhotoGather;
