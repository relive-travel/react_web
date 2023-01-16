import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAlbumInspectModal } from "redux/slice/statusSlice";

import { inspectRef, inspectFile } from "lib/utils/jsUtils";

import InspectEmpty from "views/components/notify/exception/InspectEmpty";

function AlbumInspect(props) {
  const dispatch = useDispatch();

  const [inspectList, setInspectList] = useState([]);

  const photoFile = useSelector((state) => state.photo.file);

  useEffect(() => {
    if (!inspectRef(props.titleRef))
      setInspectList((inspectList) => [...inspectList, "제목"]);
    if (!inspectRef(props.dateRef))
      setInspectList((inspectList) => [...inspectList, "날짜"]);
    if (!inspectFile(photoFile))
      setInspectList((inspectList) => [...inspectList, "사진"]);
    if (!inspectRef(props.addrRef))
      setInspectList((inspectList) => [...inspectList, "주소"]);

    return () => dispatch(setAlbumInspectModal(false));
  }, []);

  return (
    <section className="alubm-inspect-component">
      <article>
        <section className="alubm-inspect-main">
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
