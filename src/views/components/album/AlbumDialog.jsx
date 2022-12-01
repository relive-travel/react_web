import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPhotoData, setPhotoFile } from "redux/slice/photoSlice";
import { setInspectionModal } from "redux/slice/modalSlice";

import { getUser } from "redux/thunk/userThunk";
import { setMarker } from "redux/thunk/markerThunk";
import { setAlbum } from "redux/thunk/albumThunk";
import { setPhoto } from "redux/thunk/photoThunk";

import { getRegionAddr } from "lib/getAddr";
import { previewClearImage } from "lib/setPreview";
import { uploadFiles } from "lib/setS3Client";

import AutoAdd from "./add/AutoAdd";
import HandAdd from "./add/HandAdd";
import ChangeAlbum from "./exception/album/ChangeAlbum";
import InspectionAlbum from "./exception/album/InspectionAlbum";

import "./AlbumDialog.scss";
function AlbumDialog(props) {
  const dispatch = useDispatch();

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const photoRef = useRef(null);
  const previewRef = useRef(null);
  const dateRef = useRef(null);
  const addrRef = useRef(null);
  const semiAddrRef = useRef(null);

  const [albumType, setAlbumType] = useState(props.albumType);

  const [changeOpen, setChangeOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const userEmail = useSelector((state) => state.user.email);
  const photoData = useSelector((state) => state.photo.data);
  const photoFile = useSelector((state) => state.photo.file);
  const searchData = useSelector((state) => state.album.search);

  const inspectStatus = useSelector((state) => state.modal.inspection);

  const handleChangeAlbumOpen = () => {
    setChangeOpen(true);
  };

  const handleChangeAlbumClose = () => {
    setChangeOpen(false);
  };

  const handlePreviewAlbumOpen = () => {
    setPreviewOpen(true);
  };

  const handlePreviewAlbumClose = () => {
    setPreviewOpen(false);
  };

  const handleChangeAlbum = () => {
    setAlbumType("hand");
  };

  const handleClearPhoto = () => {
    photoRef.current.value = "";
    photoRef.current.files = null;
    previewClearImage(previewRef.current);
    dispatch(setPhotoData(null));
    dispatch(setPhotoFile(null));
  };

  const handleClearAlbum = () => {
    titleRef.current.value = "";
    contentRef.current.value = "";
    dateRef.current.value = "";
    addrRef.current.value = "";
    semiAddrRef.current.value = "";
    handleClearPhoto();
  };

  const handlePreviewAlbum = () => {
    handlePreviewAlbumOpen();
  };

  const handleAutoInspectAlbum = () => {
    if (
      dateRef.current === null ||
      addrRef.current === null ||
      titleRef.current.value === null ||
      titleRef.current.value === "" ||
      dateRef.current.value === null ||
      dateRef.current.value === "" ||
      photoFile === null ||
      addrRef.current.value === null ||
      addrRef.current.value === "" ||
      searchData === null
    ) {
      dispatch(setInspectionModal(true));
      return false;
    }
    return true;
  };

  const handleHandInspectAlbum = () => {
    if (
      titleRef.current.value === null ||
      titleRef.current.value === "" ||
      dateRef.current.value === null ||
      dateRef.current.value === "" ||
      photoFile === null ||
      addrRef.current.value === null ||
      addrRef.current.value === "" ||
      searchData === null
    ) {
      dispatch(setInspectionModal(true));
      return false;
    }
    return true;
  };

  const handleAddAlbum = async () => {
    if (
      !(albumType === "auto"
        ? handleAutoInspectAlbum()
        : handleHandInspectAlbum())
    )
      return;

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
    <article className="album-main">
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
            handleChangeAlbumOpen={handleChangeAlbumOpen}
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
        <button className="album-preview-button" onClick={handlePreviewAlbum}>
          미리 보기
        </button>
        <button className="album-add-button" onClick={handleAddAlbum}>
          추가 하기
        </button>
      </footer>
      <aside>
        {changeOpen ? (
          <ChangeAlbum
            handleClearPhoto={handleClearPhoto}
            handleChangeAlbum={handleChangeAlbum}
            handleClearAlbum={handleClearAlbum}
            handleChangeAlbumClose={handleChangeAlbumClose}
          />
        ) : null}
        {inspectStatus ? (
          <InspectionAlbum
            titleRef={titleRef}
            dateRef={dateRef}
            photoRef={photoRef}
            addrRef={addrRef}
          />
        ) : null}
      </aside>
    </article>
  );
}
export default AlbumDialog;
