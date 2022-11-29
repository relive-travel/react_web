import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setAlbumSearch } from "redux/slice/albumSlice";

import { setKakaoMapWithRoad } from "lib/setKakaoMap";

import "./SearchRoadAddr.scss";
function SearchRoadAddr(props) {
  const dispatch = useDispatch();

  const compRef = useRef(null);
  const roadAddrRef = useRef(null);
  const kakaoMapRef = useRef(null);

  const [roadAddrRes, setRoadAddrRes] = useState(null);
  const [postCodeRes, setPostCodeRes] = useState(null);

  const [roadAddrResultOpen, setRoadAddrResultOpen] = useState(false);

  const handleSearchClick = (e) => {
    if (compRef.current && !compRef.current.contains(e.target)) {
      props.handleSearchClose("road-addr");
    }
  };

  const handleSetPostcodeService = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setPostCodeRes(data);
        // setKakaoMapWithRoad({ addr: data.address + " " + data.buildingName });
        // dispatch(setAlbumSearch(data));
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
    let res = roadAddrRes.road_address
      ? {
          latitude: parseFloat(roadAddrRes.y),
          longitude: parseFloat(roadAddrRes.x),
          addr: roadAddrRes.road_address.address_name,
          semiAddr: roadAddrRes.road_address.building_name,
        }
      : {
          latitude: parseFloat(roadAddrRes.y),
          longitude: parseFloat(roadAddrRes.x),
          addr: roadAddrRes.address.address_name,
        };
    dispatch(setAlbumSearch(res));
    props.handleSearchClose("road-addr");
  };

  useEffect(() => {
    if (roadAddrResultOpen) {
      handleSetKakaoMap();
    } else {
      handleSetPostcodeService();
    }
  }, [roadAddrResultOpen]);

  return (
    <section className="road-addr-component" onClick={handleSearchClick}>
      <article ref={compRef}>
        {roadAddrResultOpen ? (
          <section className="road-addr-result">
            <header>
              <article>원하시는 곳이 맞는지 확인해주세요!</article>
            </header>
            <main>
              <article
                className="kakao-map-road-addr"
                ref={kakaoMapRef}
              ></article>
            </main>
            <footer className="road-addr-buttons">
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
          <section className="road-addr-main" ref={roadAddrRef}></section>
        )}
      </article>
    </section>
  );
}
export default SearchRoadAddr;
