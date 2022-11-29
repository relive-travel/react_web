import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { setAlbumSearch } from "redux/slice/albumSlice";

import "./SearchRoadAddr.scss";
function SearchRoadAddr(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);
  const roadaddrRef = useRef(null);

  const handleSearchClick = (e) => {
    if (compRef.current && !compRef.current.contains(e.target)) {
      props.handleSearchClose("roadaddr");
    }
  };

  useEffect(() => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        dispatch(setAlbumSearch(data));
      },
      onclose: (state) => {
        //state는 우편번호 찾기 화면이 어떻게 닫혔는지에 대한 상태 변수 이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
        if (state === "FORCE_CLOSE") {
          //사용자가 브라우저 닫기 버튼을 통해 팝업창을 닫았을 경우, 실행될 코드를 작성하는 부분입니다.
          //embed()에서는 FORCE_CLOSE 동작은 존재하지 않습니다.
        } else if (state === "COMPLETE_CLOSE") {
          //사용자가 검색결과를 선택하여 팝업창이 닫혔을 경우, 실행될 코드를 작성하는 부분입니다.
          //oncomplete 콜백 함수가 실행 완료된 후에 실행됩니다.
          props.handleSearchClose("roadaddr");
        }
      },
      width: "100%",
      height: "100%",
    }).embed(roadaddrRef.current, {});
    console.log("만들어졌어");
  }, []);

  return (
    <section className="roadaddr-component" onClick={handleSearchClick}>
      <article ref={compRef}>
        <section className="roadaddr-main" ref={roadaddrRef}></section>
      </article>
    </section>
  );
}
export default SearchRoadAddr;
