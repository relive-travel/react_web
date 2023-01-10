import { getKoreanAddr } from "lib/utils/data/addr";
import { useDispatch, useSelector } from "react-redux";

import {
  setAlbumCreateDialog,
  setNotifyAlbumCreate,
} from "redux/slice/statusSlice";

import { getMarkerAll, getMarkerAllMatchRegion } from "redux/thunk/markerThunk";

import AlbumCreateComplete from "views/components/notify/complete/AlbumCreateComplete";

function AlbumCreateSuccess() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const mapRegion = useSelector((state) => state.map.region);

  return (
    <section className="album-create-success-component">
      <article>
        <section className="album-create-success-main">
          <header>
            <AlbumCreateComplete />
          </header>
          <footer>
            <button
              className="create-success-ok-button"
              onClick={() => {
                mapRegion === "korea"
                  ? dispatch(getMarkerAll({ userId: userId }))
                  : dispatch(
                      getMarkerAllMatchRegion({
                        userId: userId,
                        region: getKoreanAddr(mapRegion),
                      })
                    );
                dispatch(setNotifyAlbumCreate(false));
                dispatch(setAlbumCreateDialog(false));
              }}
            >
              고마워요! 🥕
            </button>
          </footer>
        </section>
      </article>
    </section>
  );
}

export default AlbumCreateSuccess;
