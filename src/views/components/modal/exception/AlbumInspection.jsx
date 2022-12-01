import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumInspectionModal } from "redux/slice/statusSlice";

import "./AlbumInspection.scss";
function AlbumInspection(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);

  const [inspectList, setInspectList] = useState([]);

  const handleSearchClick = (e) => {
    if (compRef.current && !compRef.current.contains(e.target)) {
      dispatch(setAlbumInspectionModal(false));
    }
  };

  useEffect(() => {
    if (
      props.titleRef.current.value === null ||
      props.titleRef.current.value === ""
    )
      setInspectList((inspectList) => [...inspectList, "제목"]);
    if (
      props.dateRef.current === null ||
      props.dateRef.current.value === null ||
      props.dateRef.current.value === ""
    )
      setInspectList((inspectList) => [...inspectList, "날짜"]);
    if (props.photoRef.current.files.length === 0)
      setInspectList((inspectList) => [...inspectList, "사진"]);
    if (
      props.addrRef.current === null ||
      props.addrRef.current.value === null ||
      props.addrRef.current.value === ""
    )
      setInspectList((inspectList) => [...inspectList, "주소"]);

    return () => dispatch(setAlbumInspectionModal(false));
  }, []);

  return (
    <section className="inspection-album-component" onClick={handleSearchClick}>
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
