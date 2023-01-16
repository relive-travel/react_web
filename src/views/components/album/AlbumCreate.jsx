import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPhotoDelete } from "redux/slice/photoSlice";
import { setAlbumSearch } from "redux/slice/albumSlice";
import {
  setAlbumCreateDialog,
  setAlbumInspectModal,
  setAlbumPreviewModal,
  setNotifyAlbumCreate,
} from "redux/slice/statusSlice";

import { setMarker } from "redux/thunk/markerThunk";
import { setAlbum } from "redux/thunk/albumThunk";
import { setPhoto } from "redux/thunk/photoThunk";

import { getRegionAddr } from "lib/utils/data/addr";
import { clearPreview, clearRef, inspectRefList } from "lib/utils/jsUtils";
import { uploadFiles } from "lib/utils/s3Utils";

import AutoAdd from "./add/AutoAdd";
import HandAdd from "./add/HandAdd";
import AlbumChange from "../modal/exception/AlbumChange";
import AlbumInspect from "../modal/exception/AlbumInspect";
import AlbumPreview from "../modal/AlbumPreview";
import SearchKeyword from "./add/hand/SearchKeyword";
import SearchRoadAddr from "./add/hand/SearchRoadAddr";
import SearchLocation from "./add/hand/SearchLocation";
import AlbumCreateSuccess from "../modal/success/AlbumCreateSuccess";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "./add/index.scss";
function AlbumCreate(props) {
  const dispatch = useDispatch();

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const photoRef = useRef(null);
  const previewRef = useRef(null);
  const dateRef = useRef(null);
  const addrRef = useRef(null);
  const semiAddrRef = useRef(null);

  const userId = useSelector((state) => state.user.id);
  const userKakaoId = useSelector((state) => state.user.kakaoId);
  const photoFile = useSelector((state) => state.photo.file);
  const searchData = useSelector((state) => state.album.search);

  const autoDialogStatus = useSelector((state) => state.status.dialog.auto);
  const changeModalStatus = useSelector((state) => state.status.modal.change);
  const inspectModalStatus = useSelector((state) => state.status.modal.inspect);
  const previewModalStatus = useSelector((state) => state.status.modal.preview);
  const keywordDialogStatus = useSelector(
    (state) => state.status.dialog.keyword
  );
  const roadAddrDialogStatus = useSelector(
    (state) => state.status.dialog.roadAddr
  );
  const locationDialogStatus = useSelector(
    (state) => state.status.dialog.location
  );
  const albumCreateNotifyStatus = useSelector(
    (state) => state.status.notify.album.create
  );

  const handleClearPhoto = () => {
    photoRef.current.value = "";
    photoRef.current.files = null;
    clearPreview(previewRef.current);
    dispatch(setPhotoDelete());
  };

  const handleClearAlbum = () => {
    clearRef([titleRef, contentRef, dateRef, addrRef, semiAddrRef]);
    dispatch(setAlbumSearch(null));
    handleClearPhoto();
  };

  const handleInspectAlbum = () => {
    return (
      inspectRefList([titleRef, dateRef, addrRef]) &&
      photoFile !== null &&
      searchData !== null
    );
  };

  const handleAddAlbum = async () => {
    if (!handleInspectAlbum()) {
      dispatch(setAlbumInspectModal(true));
      return;
    }

    if (!userId) return;

    const markerId = dispatch(
      setMarker({
        userId: userId,
        region: getRegionAddr({
          addr: addrRef.current.value,
          semiAddr: semiAddrRef.current.value,
        }),
        latitude: searchData.latitude,
        longitude: searchData.longitude,
      })
    ).then((response) => {
      return response.payload;
    });

    const albumId = dispatch(
      setAlbum({
        userId: userId,
        markerId: await markerId,
        title: titleRef.current.value,
        content: contentRef.current.value,
        date: dateRef.current.value.split("T").join(" "),
      })
    ).then((response) => {
      return response.payload;
    });

    const filesInfo = await uploadFiles({
      files: photoFile,
      title: titleRef.current.value,
      kakaoId: userKakaoId,
    });

    const photoIdList = Promise.all(
      filesInfo.map(async (file) => {
        const photoId = dispatch(
          setPhoto({
            userId: userId,
            albumId: await albumId,
            name: file.name,
            url: file.url,
            width: file.width,
            height: file.height,
          })
        ).then((response) => {
          return response.payload;
        });

        return photoId;
      })
    );

    if ((await photoIdList).length) {
      dispatch(setNotifyAlbumCreate(true));
      handleClearAlbum();
    } else {
      alert("album create error");
    }
  };

  return (
    <section className="album-create-component">
      <article>
        <section className="album-main">
          <header className="album-title">오늘 나의 추억</header>
          <main>
            {autoDialogStatus ? (
              <AutoAdd
                titleRef={titleRef}
                contentRef={contentRef}
                photoRef={photoRef}
                previewRef={previewRef}
                dateRef={dateRef}
                addrRef={addrRef}
                semiAddrRef={semiAddrRef}
                handleClearPhoto={handleClearPhoto}
              />
            ) : (
              <HandAdd
                titleRef={titleRef}
                contentRef={contentRef}
                photoRef={photoRef}
                previewRef={previewRef}
                dateRef={dateRef}
                addrRef={addrRef}
                semiAddrRef={semiAddrRef}
              />
            )}
          </main>
          <footer className="album-buttons">
            <button className="album-clear-button" onClick={handleClearAlbum}>
              초기화
            </button>
            <button
              className="album-preview-button"
              onClick={() => {
                handleInspectAlbum()
                  ? dispatch(setAlbumPreviewModal(true))
                  : dispatch(setAlbumInspectModal(true));
              }}
            >
              미리 보기
            </button>
            <button className="album-add-button" onClick={handleAddAlbum}>
              추가 하기
            </button>
          </footer>
          <aside
            className="dialog-close-button"
            onClick={() => {
              handleClearAlbum();
              dispatch(setAlbumCreateDialog(false));
            }}
          >
            <HighlightOffIcon />
          </aside>
        </section>
      </article>
      <aside>
        {changeModalStatus ? (
          <AlbumChange
            handleClearPhoto={handleClearPhoto}
            handleClearAlbum={handleClearAlbum}
          />
        ) : null}
        {inspectModalStatus ? (
          <AlbumInspect
            titleRef={titleRef}
            dateRef={dateRef}
            photoRef={photoRef}
            addrRef={addrRef}
          />
        ) : null}
        {previewModalStatus ? (
          <AlbumPreview
            title={titleRef.current.value}
            content={contentRef.current.value}
            preview={previewRef.current.childNodes}
            date={dateRef.current.value}
            addr={addrRef.current.value}
            semiAddr={semiAddrRef.current.value}
          />
        ) : null}
        {keywordDialogStatus ? <SearchKeyword /> : null}
        {roadAddrDialogStatus ? <SearchRoadAddr /> : null}
        {locationDialogStatus ? <SearchLocation /> : null}
        {albumCreateNotifyStatus ? <AlbumCreateSuccess /> : null}
      </aside>
    </section>
  );
}
export default AlbumCreate;
