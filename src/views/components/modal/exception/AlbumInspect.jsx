import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumInspectModal } from "redux/slice/statusSlice";

import { inspectRef, inspectRefFile } from "lib/utils/jsUtils";

import InspectEmpty from "views/components/notify/exception/InspectEmpty";

import "./AlbumInspect.scss";
function AlbumInspect(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);

  const [inspectList, setInspectList] = useState([]);

  const handleOutsideClick = (e) => {
    e.stopPropagation();
    if (!compRef.current?.contains(e.target)) {
      dispatch(setAlbumInspectModal(false));
    }
  };

  useEffect(() => {
    if (!inspectRef(props.titleRef))
      setInspectList((inspectList) => [...inspectList, "제목"]);
    if (!inspectRef(props.dateRef))
      setInspectList((inspectList) => [...inspectList, "날짜"]);
    if (inspectRefFile(props.photoRef))
      setInspectList((inspectList) => [...inspectList, "사진"]);
    if (!inspectRef(props.addrRef))
      setInspectList((inspectList) => [...inspectList, "주소"]);

    return () => dispatch(setAlbumInspectModal(false));
  }, []);

  return (
    <section className="alubm-inspect-component" onClick={handleOutsideClick}>
      <article>
        <section className="alubm-inspect-main" ref={compRef}>
          <header>
            <InspectEmpty />
          </header>
          <main>
            {inspectList.map((inspect, index) => {
              return <span key={`inspect-${index}`}>{inspect}</span>;
            })}
          </main>
          <footer>
            <button
              className="inspect-write-button"
              onClick={() => {
                dispatch(setAlbumInspectModal(false));
              }}
            >
              작성할게요! 🥕
            </button>
          </footer>
        </section>
      </article>
    </section>
  );
}
export default AlbumInspect;
