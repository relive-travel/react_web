import { useEffect } from "react";
import { useRef, useState, useCallback } from "react";

import { exifImage, preivewImage } from "lib/setPreview";

import "./DragAndDrop.scss";
function DragAndDrop() {
  const dragRef = useRef(null);

  const [isDrag, setIsDrag] = useState(false);
  const [selectFiles, setselectFiles] = useState([]);

  const handleChangeFiles = useCallback(async (e) => {
    const fileObjects =
      e.type === "drop" ? e.dataTransfer.files : e.target.files;
    preivewImage(fileObjects);
    const filesInfo = await exifImage(fileObjects);
    filesInfo.forEach((fileInfo) => {
      console.log(fileInfo);
      console.log(fileInfo.exifData);
      console.log(fileInfo.exifdata);
      console.log(fileInfo.exifData.ImageWidth);
      console.log(fileInfo.exifdata.ImageWidth);
    });
  }, []);

  const handleFileFilter = useCallback((id) => {
    setselectFiles(selectFiles.filter((file) => id !== file.id));
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

    if (!e.dataTransfer.files) {
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
      console.log(dragRef.current);
      dragRef.current.addEventListener("dragnenter", handleDragEnter);
      dragRef.current.addEventListener("dragleave", handleDragLeave);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragEnter, handleDragLeave, handleDragOver, DragAndDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current) {
      console.log(dragRef.current);
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
    <section className="drag-component">
      <input
        id="photo"
        type="file"
        onChange={handleChangeFiles}
        accept="image/*"
        capture="user"
        multiple
      ></input>
      <label
        className={isDrag ? "dragging" : "drop"}
        ref={dragRef}
        htmlFor="photo"
      >
        <section className="photo-preview"></section>
      </label>
    </section>
  );
}
export default DragAndDrop;
