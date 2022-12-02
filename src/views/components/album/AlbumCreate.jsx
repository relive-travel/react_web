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

import { getRegionAddr } from "lib/getAddr";
import { previewClearImage } from "lib/setPreview";
import { uploadFiles } from "lib/setS3Client";

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

  const albumType = useSelector((state) => state.album.type);

  const userEmail = useSelector((state) => state.user.email);
  const photoFile = useSelector((state) => state.photo.file);
  const searchData = useSelector((state) => state.album.search);

  const changeStatus = useSelector((state) => state.status.modal.change);
  const inspectStatus = useSelector((state) => state.status.modal.inspection);
  const previewStatus = useSelector((state) => state.status.modal.preview);

  const handleCompClick = (e) => {
    if (compRef.current && !compRef.current.contains(e.target)) {
      handleClearAlbum();
      dispatch(setAlbumCreateDialog(false));
    }
  };

  const handleClearPhoto = () => {
    photoRef.current.value = "";
    photoRef.current.files = null;
    previewClearImage(previewRef.current);
    dispatch(setPhotoDelete());
  };

  const handleClearAlbum = () => {
    titleRef.current.value = "";
    contentRef.current.value = "";
    if (dateRef.current !== null) dateRef.current.value = "";
    if (addrRef.current !== null) addrRef.current.value = "";
    if (semiAddrRef.current !== null) semiAddrRef.current.value = "";
    dispatch(setAlbumSearch(null));
    handleClearPhoto();
  };

  const handleInspectAlbum = () => {
    if (
      titleRef.current.value === null ||
      titleRef.current.value === "" ||
      dateRef.current === null ||
      dateRef.current.value === null ||
      dateRef.current.value === "" ||
      photoFile === null ||
      addrRef.current === null ||
      addrRef.current.value === null ||
      addrRef.current.value === "" ||
      searchData === null
    ) {
      dispatch(setAlbumInspectionModal(true));
      return false;
    }
    return true;
  };

  const handleAddAlbum = async () => {
    if (!handleInspectAlbum()) return;

    const userId = dispatch(getUser({ email: userEmail })).then((response) => {
      return response.payload;
    });

    const markerId = dispatch(
      setMarker({
        userId: await userId,
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
        markerId: await markerId,
        title: titleRef.current.value,
        content: contentRef.current.value,
        date: dateRef.current.value,
      })
    ).then((response) => {
      return response.payload;
    });

    const filesInfo = await uploadFiles(
      photoFile,
      titleRef.current.value,
      userEmail
    );

    filesInfo.forEach(async (file) => {
      const photoId = dispatch(
        setPhoto({
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
    <section className="album-create-component" onClick={handleCompClick}>
      <article>
        <section className="album-main" ref={compRef}>
          <header className="album-title">당근 추가 하기</header>
          <main>
            {albumType === "auto" ? (
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
                dispatch(setAlbumPreviewModal(true));
              }}
            >
              미리 보기
            </button>
            <button className="album-add-button" onClick={handleAddAlbum}>
              추가 하기
            </button>
          </footer>
          <aside>
            {changeStatus ? (
              <AlbumChange
                handleClearPhoto={handleClearPhoto}
                handleClearAlbum={handleClearAlbum}
              />
            ) : null}
            {inspectStatus ? (
              <AlbumInspection
                titleRef={titleRef}
                dateRef={dateRef}
                photoRef={photoRef}
                addrRef={addrRef}
              />
            ) : null}
            {previewStatus ? <AlbumPreview /> : null}
          </aside>
        </section>
      </article>
    </section>
  );
}
export default AlbumCreate;
