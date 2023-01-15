import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setAlbumSelectModal,
  setDialGatherOption,
  setDialSortOption,
  setDialViewOption,
} from "redux/slice/statusSlice";
import { setMapRegion } from "redux/slice/mapSlice";
import { setMarkerData } from "redux/slice/markerSlice";

import { delCookie } from "lib/utils/jsUtils";

import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";

import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import ImageIcon from "@mui/icons-material/Image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SideDial() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewOptionStatus = useSelector((state) => state.status.option.view);
  const sortOptionStatus = useSelector((state) => state.status.option.sort);

  const [userFeatures, setUserFeatures] = useState({
    home: {
      index: 1,
      component: <HomeIcon />,
      tooltip: "홈 지도 이동",
      onClick: (e) => {
        e.stopPropagation();
        dispatch(setMarkerData(null));
        dispatch(setMapRegion("korea"));
      },
    },
    help: {
      index: 2,
      component: <HelpOutlineIcon />,
      tooltip: "이용 안내",
    },
    logout: {
      index: 3,
      component: <LogoutIcon />,
      tooltip: "로그아웃",
      onClick: (e) => {
        e.stopPropagation();
        window.Kakao.Auth.logout().then(() => {
          // delCookie와 navigate간 비동기로 처리되어
          // "/"로 돌아갔을 때, accessCookie가 남아있는 것처럼 실행됨
          // 단, 그 외 현상은 아직 발견하지 못함
          delCookie({ name: "authorize-access-token" });
          // 카카오 로그인 고급 설정에서 logout redirect url이 작동하지 않음
          navigate("/");
        });
      },
    },
  });

  const [usefulFeatures, setUsefulFeatures] = useState({
    edit: {
      index: 1,
      component: <EditIcon />,
      tooltip: "추억 만들기",
      onClick: (e) => {
        e.stopPropagation();
        dispatch(setAlbumSelectModal(true));
      },
    },
    gather: {
      index: 2,
      component: <ImageIcon />,
      tooltip: "사진 모아보기",
      onClick: (e) => {
        e.stopPropagation();
        dispatch(setDialGatherOption(true));
      },
    },
  });

  useEffect(() => {
    setUsefulFeatures({
      ...usefulFeatures,
      sort: {
        index: 3,
        component: sortOptionStatus ? <PlaceIcon /> : <AccessTimeIcon />,
        tooltip: sortOptionStatus ? "지역순 정렬" : "시간순 정렬",
        onClick: (e) => {
          e.stopPropagation();
          dispatch(setDialSortOption(!sortOptionStatus));
        },
      },
      visibility: {
        index: 4,
        component: viewOptionStatus ? (
          <VisibilityOffIcon />
        ) : (
          <VisibilityIcon />
        ),
        tooltip: viewOptionStatus ? "지역이름 숨기기" : "지역이름 보기",
        onClick: (e) => {
          e.stopPropagation();
          dispatch(setDialViewOption(!viewOptionStatus));
        },
      },
    });
  }, [viewOptionStatus, sortOptionStatus]);

  return (
    <>
      <article className="side-dial-user">
        <section className="user-features">
          {Object.entries(userFeatures)
            .sort((a, b) => a[1].index - b[1].index)
            .map(([key, value], idx) => {
              return (
                <aside key={idx} onClick={value.onClick}>
                  <article className={`user-${key}`}>
                    {value.component}
                    <span className="tooltip">{value.tooltip}</span>
                  </article>
                </aside>
              );
            })}
        </section>
      </article>
      <article className="side-dial-useful">
        <article className="useful-features">
          {Object.entries(usefulFeatures)
            .sort((a, b) => b[1].index - a[1].index)
            .map(([key, value], idx) => {
              return (
                <aside key={idx} onClick={value.onClick}>
                  <article className={`useful-${key}`}>
                    {value.component}
                    <span className="tooltip">{value.tooltip}</span>
                  </article>
                </aside>
              );
            })}
        </article>
      </article>
    </>
  );
}

export default SideDial;
