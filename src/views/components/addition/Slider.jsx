import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAlbumData } from "redux/slice/albumSlice";
import { setAlbumSwiperDialog } from "redux/slice/statusSlice";
import { setMarkerSlider } from "redux/slice/markerSlice";

import { getMarkerAll, getMarkerMatchRegion } from "redux/thunk/markerThunk";
import { getAlbumMatchMarkerId } from "redux/thunk/albumThunk";
import { getPhotoMatchAlbumId } from "redux/thunk/photoThunk";

import { getAddr, getKoreanAddr } from "lib/get/addr";

import "./Slider.scss";
function Slider(props) {
  const dispatch = useDispatch();

  const sortStatus = useSelector((state) => state.status.option.sort);

  const mapRegion = useSelector((state) => state.map.region);
  const markerData = useSelector((state) => state.marker.data);
  const sliderData = useSelector((state) => state.marker.slider);

  useEffect(() => {
    if (mapRegion === "korea") {
      dispatch(getMarkerAll());
    } else {
      dispatch(getMarkerMatchRegion(getKoreanAddr(mapRegion)));
    }
  }, [mapRegion]);

  const handleGetSliderInfo = async () => {
    const sliderInfo = markerData.reduce(async (slider, marker, idx) => {
      const sliderPromise = await slider;
      const albumData = dispatch(
        getAlbumMatchMarkerId({ markerId: marker.id })
      ).then((response) => {
        return response.payload;
      });
      const gatherData = Promise.all(
        (await albumData).map(async (album) => {
          const photoData = dispatch(
            getPhotoMatchAlbumId({ albumId: album.id })
          ).then((response) => {
            return response.payload;
          });
          return {
            album,
            photo: await photoData,
          };
        })
      );
      (await gatherData).forEach((gather) => {
        sliderPromise.push({ ...gather, marker });
      });
      return sliderPromise;
    }, []);
    dispatch(
      setMarkerSlider(
        (await sliderInfo).sort((a, b) =>
          b.album.date.localeCompare(a.album.date)
        )
      )
    );
  };

  useEffect(() => {
    if (markerData) {
      handleGetSliderInfo();
    }
  }, [markerData]);

  return (
    <>
      {sliderData?.map(({ marker, album, photo }, index) => {
        return sortStatus ? (
          <></>
        ) : (
          <article
            className="slider-info"
            key={`slider-${index}`}
            onClick={() => {
              dispatch(setAlbumData([{ marker, album, photo }]));
              dispatch(setAlbumSwiperDialog(true));
            }}
          >
            <section className="info-header">
              <div className="info-addr">{getAddr(marker.region.addr)}</div>
              <div className="info-photo-ea">
                <span>{photo.length}</span>
                <span>🥕</span>
              </div>
            </section>
            <section>
              <div className="info-main">
                <div className="info-date">{album.date}</div>
                <div className="info-title">{album.title}</div>
                <div className="info-addr">{marker.region.addr}</div>
                <div className="info-semi-addr">{marker.region.semiAddr}</div>
              </div>
            </section>
          </article>
        );
      })}
    </>
    // <>
    //   {albumInfo
    //     .sort((o1, o2) => Date.parse(o2.date) - Date.parse(o1.date))
    //     .map((info) => {
    //       return (
    //         <article
    //           className="slider-info"
    //           key={info.id}
    //           onClick={() => {
    //             dispatch(setAlbumData([info]));
    //             dispatch(setAlbumSwiperDialog(true));
    //           }}
    //         >
    //           <section className="info-header">
    //             <div className="info-addr">
    //               {getAddr(info.marker.region.addr)}
    //             </div>
    //             <div className="info-photo-ea">
    //               <span>{info.photo.length}</span>
    //               <span>🥕</span>
    //             </div>
    //           </section>
    //           <section>
    //             <div className="info-main">
    //               <div className="info-date">{info.date}</div>
    //               <div className="info-title">{info.title}</div>
    //               <div className="info-addr">{info.marker.region.addr}</div>
    //               <div className="info-semi-addr">
    //                 {info.marker.region.semiAddr}
    //               </div>
    //             </div>
    //           </section>
    //         </article>
    //       );
    //     })}
    // </>
  );
}
export default Slider;
