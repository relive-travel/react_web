import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPhotoDelete } from "redux/slice/photoSlice";
import { setAlbumSearch } from "redux/slice/albumSlice";
import {
  setAlbumCreateDialog,
  setAlbumInspectionModal,
  setAlbumPreviewModal,
} from "redux/slice/statusSlice";

import { getUser } from "redux/thunk/userThunk";
import { setMarker } from "redux/thunk/markerThunk";
import { setAlbum } from "redux/thunk/albumThunk";
import { setPhoto } from "redux/thunk/photoThunk";

import { getRegionAddr } from "lib/utils/addr";
import { clearPreview, clearRef, inspectRefList } from "lib/utils/jsUtils";
import { uploadFiles } from "lib/utils/s3Utils";

import AutoAdd from "./add/AutoAdd";
import HandAdd from "./add/HandAdd";
import AlbumChange from "../modal/exception/AlbumChange";
import AlbumInspection from "../modal/exception/AlbumInspection";
import AlbumPreview from "../modal/AlbumPreview";

import "./AlbumCreate.scss";
function AlbumCreate(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const photoRef = useRef(null);
  const previewRef = useRef(null);
  const dateRef = useRef(null);
  const addrRef = useRef(null);
  const semiAddrRef = useRef(null);

  const userId = useSelector((state) => state.user.id);
  const userEmail = useSelector((state) => state.user.email);
  const photoFile = useSelector((state) => state.photo.file);
  const searchData = useSelector((state) => state.album.search);

  const autoDialogStatus = useSelector((state) => state.status.dialog.auto);
  const changeModalStatus = useSelector((state) => state.status.modal.change);
  const inspectModalStatus = useSelector(
    (state) => state.status.modal.inspection
  );
  const previewModalStatus = useSelector((state) => state.status.modal.preview);

  const handleOutsideClick = (e) => {
    if (!compRef.current?.contains(e.target)) {
      e.stopPropagation();
      handleClearAlbum();
      dispatch(setAlbumCreateDialog(false));
    }
  };

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
      inspectRefList([titleRef, contentRef, dateRef, addrRef, semiAddrRef]) &&
      photoFile !== null &&
      searchData !== null
    );
  };

  const handleAddAlbum = async () => {
    if (!handleInspectAlbum()) {
      dispatch(setAlbumInspectionModal(true));
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
      email: userEmail,
    });

    filesInfo.forEach(async (file) => {
      const photoId = dispatch(
        setPhoto({
          userId: userId,
          albumId: await albumId,
          name: file.name,
          url: file.url,
        })
      ).then((response) => {
        return response.payload;
      });
    });
  };

  return (
    <section className="album-create-component" onClick={handleOutsideClick}>
      <article>
        <section className="album-main" ref={compRef}>
          <header className="album-title">당근 추가 하기</header>
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
                  : dispatch(setAlbumInspectionModal(true));
              }}
            >
              미리 보기
            </button>
            <button className="album-add-button" onClick={handleAddAlbum}>
              추가 하기
            </button>
          </footer>
          <aside>
            {changeModalStatus ? (
              <AlbumChange
                handleClearPhoto={handleClearPhoto}
                handleClearAlbum={handleClearAlbum}
              />
            ) : null}
            {inspectModalStatus ? (
              <AlbumInspection
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
          </aside>
        </section>
      </article>
    </section>
  );
}
export default AlbumCreate;
