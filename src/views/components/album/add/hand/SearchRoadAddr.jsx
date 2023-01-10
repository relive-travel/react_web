import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumSearch } from "redux/slice/albumSlice";
import { setAlbumHandRoadAddrDialog } from "redux/slice/statusSlice";

import { setKakaoMapWithRoad } from "lib/utils/map/kakaoMap";

function SearchRoadAddr(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);
  const roadAddrRef = useRef(null);
  const kakaoMapRef = useRef(null);

  const [roadAddrRes, setRoadAddrRes] = useState(null);
  const [postCodeRes, setPostCodeRes] = useState(null);

  const [roadAddrResultOpen, setRoadAddrResultOpen] = useState(false);

  const handleOutsideClick = (e) => {
    e.stopPropagation();
    if (!compRef.current?.contains(e.target)) {
      dispatch(setAlbumHandRoadAddrDialog(false));
    }
  };

  const handleSetPostcodeService = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setPostCodeRes(data);
      },
      onclose: (state) => {
        //state는 우편번호 찾기 화면이 어떻게 닫혔는지에 대한 상태 변수 이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
        if (state === "FORCE_CLOSE") {
          //사용자가 브라우저 닫기 버튼을 통해 팝업창을 닫았을 경우, 실행될 코드를 작성하는 부분입니다.
          //embed()에서는 FORCE_CLOSE 동작은 존재하지 않습니다.
        } else if (state === "COMPLETE_CLOSE") {
          //사용자가 검색결과를 선택하여 팝업창이 닫혔을 경우, 실행될 코드를 작성하는 부분입니다.
          //oncomplete 콜백 함수가 실행 완료된 후에 실행됩니다.
          setRoadAddrResultOpen(true);
        }
      },
      width: "100%",
      height: "100%",
    }).embed(roadAddrRef.current, {});
  };

  const handleSetKakaoMap = () => {
    if (kakaoMapRef.current !== null) {
      setKakaoMapWithRoad(
        { mapContainer: kakaoMapRef.current, addr: postCodeRes.address },
        (roadAddrResult) => {
          setRoadAddrRes(roadAddrResult);
        }
      );
    }
  };

  const handleReSearchAddr = () => {
    setRoadAddrResultOpen(false);
  };

  const handleSelectResult = () => {
    let res = {
      latitude: parseFloat(roadAddrRes.y),
      longitude: parseFloat(roadAddrRes.x),
      addr: roadAddrRes.road_address
        ? roadAddrRes.road_address.address_name
        : roadAddrRes.address.address_name,
      semiAddr: roadAddrRes.road_address
        ? roadAddrRes.road_address.building_name
        : null,
    };
    dispatch(setAlbumSearch(res));
    dispatch(setAlbumHandRoadAddrDialog(false));
  };

  useEffect(() => {
    if (roadAddrResultOpen) {
      handleSetKakaoMap();
    } else {
      handleSetPostcodeService();
    }
  }, [roadAddrResultOpen]);

  return (
    <section
      className="search-road-addr-component"
      onClick={handleOutsideClick}
    >
      <article ref={compRef}>
        {roadAddrResultOpen ? (
          <section className="search-road-addr-result">
            <header>
              <article>
                추억의 <span className="text-highlight-main">장소</span>가
                여기인가요?~!
              </article>
            </header>
            <main>
              <article className="kakao-map-info" ref={kakaoMapRef}></article>
            </main>
            <footer>
              <button
                className="road-addr-re-search-button"
                onClick={handleReSearchAddr}
              >
                달라요ㅜ.ㅜ
              </button>
              <button
                className="road-addr-select-button"
                onClick={handleSelectResult}
              >
                맞아요!
              </button>
            </footer>
          </section>
        ) : (
          <section
            className="search-road-addr-main"
            ref={roadAddrRef}
          ></section>
        )}
      </article>
    </section>
  );
}
export default SearchRoadAddr;
