import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setPhotoDelete } from "redux/slice/photoSlice";

import AlbumDialog from "./AlbumDialog";

import "./AlbumSelect.scss";
function AlbumSelect(props) {
  const dispatch = useDispatch();
  const [selectType, setSelectType] = useState(null);
  const [selectOptionOpen, setSelectOptionOpen] = useState(false);
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);

  const handleSelectOptionOpen = () => {
    setSelectOptionOpen(true);
  };

  const handleSelectOptionClose = (type) => {
    dispatch(setPhotoDelete());
    setSelectOptionOpen(false);
    setSelectType(type);
    handleDialogOpen();
  };

  const handleDialogOpen = () => {
    setAlbumDialogOpen(true);
  };

  const handleDialogClose = () => {
    setAlbumDialogOpen(false);
  };

  useEffect(() => {
    handleSelectOptionOpen();

    return () => {
      handleSelectOptionOpen();
      handleDialogClose();
    };
  }, []);

  return (
    <>
      {selectOptionOpen ? (
        <section className="select-option-component">
          <main className="option-buttons">
            <article>
              <button onClick={() => handleSelectOptionClose("auto")}>
                <p>간편하게!</p>
              </button>
            </article>
            <article>
              <button onClick={() => handleSelectOptionClose("hand")}>
                <p>직접쓸래!</p>
              </button>
            </article>
          </main>
        </section>
      ) : null}

      {albumDialogOpen ? (
        <section className="album-component">
          <AlbumDialog albumType={selectType}></AlbumDialog>
        </section>
      ) : null}
    </>
  );
}
export default AlbumSelect;
