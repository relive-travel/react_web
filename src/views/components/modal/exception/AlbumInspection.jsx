import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumInspectionModal } from "redux/slice/statusSlice";

import { inspectRef, inspectRefFile } from "lib/utils/inspect";

import "./AlbumInspection.scss";
function AlbumInspection(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);

  const [inspectList, setInspectList] = useState([]);

  const handleOutsideClick = (e) => {
    e.stopPropagation();
    if (!compRef.current?.contains(e.target)) {
      dispatch(setAlbumInspectionModal(false));
    }
  };

  useEffect(() => {
    if (inspectRef(props.titleRef))
      setInspectList((inspectList) => [...inspectList, "제목"]);
    if (inspectRef(props.dateRef))
      setInspectList((inspectList) => [...inspectList, "날짜"]);
    if (inspectRefFile(props.photoRef))
      setInspectList((inspectList) => [...inspectList, "사진"]);
    if (inspectRef(props.addrRef))
      setInspectList((inspectList) => [...inspectList, "주소"]);

    return () => dispatch(setAlbumInspectionModal(false));
  }, []);

  return (
    <section
      className="inspection-album-component"
      onClick={handleOutsideClick}
    >
      <article>
        <section className="inspection-album-main" ref={compRef}>
          <header>
            이런..! <span>필수항목</span>이 비어있어요!
          </header>
          <main>
            {inspectList.map((inspect, index) => {
              return <span key={index}>{inspect}</span>;
            })}
          </main>
          <footer>
            <button
              onClick={() => {
                dispatch(setAlbumInspectionModal(false));
              }}
            >
              작성할게요!
            </button>
          </footer>
        </section>
      </article>
    </section>
  );
}
export default AlbumInspection;
