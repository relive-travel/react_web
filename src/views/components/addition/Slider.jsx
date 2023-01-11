import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAlbumData } from "redux/slice/albumSlice";
import { setAlbumSwiperDialog } from "redux/slice/statusSlice";
import { setMarkerSlider } from "redux/slice/markerSlice";

import { getMarkerAll, getMarkerAllMatchRegion } from "redux/thunk/markerThunk";
import { getAlbumMatchMarkerId } from "redux/thunk/albumThunk";
import { getPhotoMatchAlbumId } from "redux/thunk/photoThunk";

import {
  getAddr,
  getAddrPriority,
  getFullKoreanAddr,
  getKoreanAddr,
} from "lib/utils/data/addr";
import { groupRegion } from "lib/utils/jsUtils";

import SliderEmpty from "../notify/exception/SliderEmpty";

import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

function Slider(props) {
  const dispatch = useDispatch();

  const sortOptionStatus = useSelector((state) => state.status.option.sort);

  const userId = useSelector((state) => state.user.id);

  const mapRegion = useSelector((state) => state.map.region);
  const markerData = useSelector((state) => state.marker.data);
  const sliderTimeData = useSelector((state) => state.marker.slider.time);
  const sliderRegionData = useSelector((state) => state.marker.slider.region);

  const handleElementStatus = ({ key, state }) => {
    const $elements = document.querySelectorAll(`.slider-${key}`);
    $elements.forEach(($element) => {
      state
        ? $element.classList.add("open")
        : $element.classList.remove("open");
    });
  };

  const handleElementsEffect = ({ element, state }) => {
    state
      ? element.classList.add("fade-in")
      : element.classList.remove("fade-in");
  };

  const handleElementAllClose = ({ element }) => {
    const $headers = element.querySelectorAll("header");
    $headers.forEach(($header) => {
      $header.dataset.open = false;
    });
    const $elements = element.querySelectorAll(".open");
    $elements.forEach(($element) => {
      $element.classList.remove("open");
    });
  };

  const handleClickRegion = (key) => (e) => {
    e.stopPropagation();
    const open = JSON.parse(e.target.dataset.open);
    if (open) handleElementAllClose({ element: e.target.closest("section") });
    handleElementStatus({ key, state: !open });
    handleElementsEffect({
      element: e.target.closest("section"),
      state: !open,
    });
    e.target.dataset.open = !open;
  };

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

    const sliderTime = (await sliderInfo).sort((a, b) =>
      b.album.date.localeCompare(a.album.date)
    );

    if (sliderTime.length) {
      dispatch(
        setMarkerSlider({
          type: "time",
          data: sliderTime,
        })
      );
    }

    const addrPriority = getAddrPriority();
    const sliderRegion = Object.entries(
      groupRegion({ array: await sliderInfo })
    )
      .map(([key, values]) => {
        return [
          key,
          Object.entries(values).sort((a, b) =>
            a[0] === b[0]
              ? b[1].album.date.localeCompare(a[1].album.date)
              : a[0].localeCompare(b[0])
          ),
        ];
      })
      .sort(
        (a, b) =>
          addrPriority.findIndex((addr) => a[0].includes(addr)) -
          addrPriority.findIndex((addr) => b[0].includes(addr))
      );

    if (sliderRegion.length) {
      dispatch(
        setMarkerSlider({
          type: "region",
          data: sliderRegion,
        })
      );
    }
  };

  useEffect(() => {
    if (userId) {
      if (mapRegion === "korea") {
        dispatch(getMarkerAll({ userId: userId }));
      } else {
        dispatch(
          getMarkerAllMatchRegion({
            userId: userId,
            region: getKoreanAddr(mapRegion),
          })
        );
      }
    }
  }, [userId, mapRegion]);

  useEffect(() => {
    if (markerData) {
      handleGetSliderInfo();
    }
  }, [markerData]);

  return (
    <>
      {sortOptionStatus ? (
        sliderRegionData ? (
          sliderRegionData.map(([district, cities], index) => {
            return (
              <section className="slider-district" key={`district-${index}`}>
                <header
                  className="district-name"
                  data-open={false}
                  onClick={handleClickRegion(`${district}-city-${index}`)}
                >
                  {getFullKoreanAddr(district)}
                  <aside
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        setAlbumData(
                          cities.reduce((acc, [_, cur]) => {
                            acc.push(...cur);
                            return acc;
                          }, [])
                        )
                      );
                      dispatch(setAlbumSwiperDialog(true));
                    }}
                  >
                    <PhotoLibraryIcon key={`district-${index}`} />
                  </aside>
                </header>
                {cities.map(([city, regions], idx) => {
                  return (
                    <section
                      className={`slider-${district}-city-${index}`}
                      key={`${district}-city-${idx}`}
                    >
                      <header
                        className="city-name"
                        data-open={false}
                        onClick={handleClickRegion(
                          `${city.replace(" ", "-")}-region-${idx}`
                        )}
                      >
                        {city}
                        <aside
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setAlbumData(regions));
                            dispatch(setAlbumSwiperDialog(true));
                          }}
                        >
                          <PhotoLibraryIcon key={`${district}-city-${idx}`} />
                        </aside>
                      </header>
                      {regions.map(({ marker, album, photo }, i) => {
                        return (
                          <section
                            className={`slider-${city.replace(
                              " ",
                              "-"
                            )}-region-${idx}`}
                            key={`${city.replace(" ", "-")}-region-${i}`}
                            onClick={() => {
                              dispatch(
                                setAlbumData([{ marker, album, photo }])
                              );
                              dispatch(setAlbumSwiperDialog(true));
                            }}
                          >
                            <header>
                              <article className="region-addr">
                                {marker.region.addr}
                              </article>
                              <article className="region-photo">
                                <span>{photo.length}</span>
                                <span>🥕</span>
                              </article>
                            </header>
                            <main>
                              <article className="region-date">
                                {album.date}
                              </article>
                              <article className="region-title">
                                {album.title}
                              </article>
                              <article className="region-address">
                                {marker.region.semiAddr}
                              </article>
                            </main>
                          </section>
                        );
                      })}
                    </section>
                  );
                })}
              </section>
            );
          })
        ) : (
          <SliderEmpty />
        )
      ) : sliderTimeData ? (
        sliderTimeData.map(({ marker, album, photo }, index) => {
          return (
            <section
              className="slider-time"
              key={`slider-${index}`}
              onClick={() => {
                dispatch(setAlbumData([{ marker, album, photo }]));
                dispatch(setAlbumSwiperDialog(true));
              }}
            >
              <header>
                <article className="time-addr">
                  {getAddr(marker.region.addr)}
                </article>
                <article className="time-photo">
                  <span>{photo.length}</span>
                  <span>🥕</span>
                </article>
              </header>
              <main>
                <article className="time-date">{album.date}</article>
                <article className="time-title">{album.title}</article>
                <article className="time-address">
                  {marker.region.semiAddr}{" "}
                  <span className="highlight-behind">
                    ({marker.region.addr})
                  </span>
                </article>
              </main>
            </section>
          );
        })
      ) : (
        <SliderEmpty />
      )}
    </>
  );
}
export default Slider;
