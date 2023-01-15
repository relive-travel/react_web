import loadImage from "blueimp-load-image";
import { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { setPhotoData, setPhotoFile } from "redux/slice/photoSlice";

import { clearPreview } from "lib/utils/jsUtils";
import { getExifData, getExifDataList } from "lib/utils/data/exifData";

import AlbumAddMsg from "views/components/notify/message/AlbumAddMsg";

function DragAndDrop(props) {
  const dispatch = useDispatch();

  const dragRef = useRef(null);

  let photoFiles = null;

  const [isDrag, setIsDrag] = useState(false);
  const [photoList, setPhotoList] = useState([]);

  const preivewImage = ($preview, fileObjects) => {
    clearPreview($preview);

    const files = Object.values(fileObjects);
    files.forEach(async (file, index) => {
      const fileExifData = await loadImage(file);
      const width = fileExifData.originalWidth;
      const height = fileExifData.originalHeight;

      const $section = document.createElement("section");
      $section.className = `preview-img`;

      const $img = document.createElement("img");
      $img.className = `preview-${index}`;
      width > height
        ? ($img.style.height = "100%")
        : ($img.style.width = "100%");

      const $close = document.createElement("aside");
      $close.className = `preview-close`;
      if (props.dragType == "hand") {
        $close.onclick = () =>
          handleFileFilter({ key: index, name: file.name });
      }

      $section.appendChild($img);
      $section.appendChild($close);
      $preview.appendChild($section);

      const reader = new FileReader();

      reader.addEventListener("load", () => {
        $img.src = reader.result;
      });

      reader.readAsDataURL(file);
    });
  };

  const handleChangeFiles = useCallback(async (e) => {
    const fileObject =
      e.type === "drop" ? e.dataTransfer.files : e.target.files;
    if (fileObject.length) {
      fileObject.length === 1
        ? dispatch(setPhotoData(await getExifData(fileObject)))
        : setPhotoList(await getExifDataList(fileObject));
      photoFiles = fileObject;
      dispatch(setPhotoFile(photoFiles));
      preivewImage(props.previewRef.current, fileObject);
      if (props.dragType == "hand") {
        e.target.value = null;
      }
    }
  }, []);

  const handleFileFilter = useCallback(({ key, name }) => {
    const $previewElement = document.querySelector(`.preview-${key}`);
    const $sectionElement = $previewElement.closest("section");
    $sectionElement.remove();
    photoFiles = {
      ...Object.values(photoFiles).filter((file) => file.name != name),
    };
    dispatch(setPhotoFile(photoFiles));
    setPhotoList([...photoList.filter((_, idx) => idx != key)]);
  });

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDrag(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      setIsDrag(true);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    handleChangeFiles(e);
    setIsDrag(false);
  }, []);

  const initDragEvents = useCallback(() => {
    if (dragRef.current) {
      dragRef.current.addEventListener("dragnenter", handleDragEnter);
      dragRef.current.addEventListener("dragleave", handleDragLeave);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragEnter, handleDragLeave, handleDragOver, DragAndDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current) {
      dragRef.current.removeEventListener("dragnenter", handleDragEnter);
      dragRef.current.removeEventListener("dragleave", handleDragLeave);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragEnter, handleDragLeave, handleDragOver, DragAndDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <>
      {props.dragType === "auto" ? (
        <section className="auto-drag-component">
          <input
            id="photo"
            type="file"
            onChange={handleChangeFiles}
            accept="Image/*"
            ref={props.photoRef}
          ></input>
          <label
            className={isDrag ? "dragging" : "drop"}
            ref={dragRef}
            htmlFor="photo"
          >
            <section className="drag-photo-preview" ref={props.previewRef}>
              <AlbumAddMsg />
            </section>
          </label>
        </section>
      ) : (
        <section className="hand-drag-component">
          <main className="drag-photo-preview" ref={props.previewRef}>
            <input
              id="photo"
              type="file"
              onChange={handleChangeFiles}
              accept="image/*"
              multiple
              ref={props.photoRef}
            ></input>
            <label
              className={isDrag ? "dragging" : "drop"}
              ref={dragRef}
              htmlFor="photo"
            >
              <AlbumAddMsg />
            </label>
          </main>
        </section>
      )}
    </>
  );
}
export default DragAndDrop;
