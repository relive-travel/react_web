import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";

import EditIcon from "@mui/icons-material/Edit";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

import ImageIcon from "@mui/icons-material/Image";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect } from "react";

function SideDial() {
  const dispatch = useDispatch();

  const [userFeatures, setUserFeatures] = useState({
    home: {
      index: 1,
      component: <HomeIcon />,
      tooltip: "홈 지도 이동",
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
    },
  });

  const [usefulFeatures, setUsefulFeatures] = useState({
    home: {
      component: <LogoutIcon />,
      tooltip: "로그아웃",
    },
    home: {
      component: <LogoutIcon />,
      tooltip: "로그아웃",
    },
  });

  const viewOptionStatus = useSelector((state) => state.status.option.view);
  const sortOptionStatus = useSelector((state) => state.status.option.sort);

  useEffect(() => {
    let features = usefulFeatures;
    features.view = viewOptionStatus
      ? {
          index: 4,
          component: <VisibilityOffIcon />,
          tooltop: "지역이름 숨기기",
        }
      : { index: 4, component: <VisibilityIcon />, tooltop: "지역이름 보기" };
    setUsefulFeatures(features);
  }, [viewOptionStatus]);

  useEffect(() => {
    let features = usefulFeatures;
    features.sort = sortOptionStatus
      ? { index: 3, component: <PlaceIcon />, tooltop: "지역순 정렬" }
      : { index: 3, component: <AccessTimeIcon />, tooltop: "시간순 정렬" };
    setUsefulFeatures(features);
  }, [sortOptionStatus]);

  return (
    <>
      <article className="side-dial-user">
        <section className="user-features">
          {Object.entries(userFeatures)
            .sort((a, b) => a[1].index - b[1].index)
            .map(([key, value], idx) => {
              return (
                <aside key={idx}>
                  <article className={`user-${key}`}>
                    {value.component}
                    <span className="tooltip">{value.tooltip}</span>
                  </article>
                </aside>
              );
            })}
          {/* <aside>
            <article className="user-home">
              <HomeIcon />
              <span className="tooltip">홈 지도 이동</span>
            </article>
          </aside>
          <aside>
            <article className="user-help">
              <HelpOutlineIcon />
              <span className="tooltip">이용 안내</span>
            </article>
          </aside>
          <aside>
            <article className="user-logout">
              <LogoutIcon />
              <span className="tooltip">로그아웃</span>
            </article>
          </aside> */}
        </section>
      </article>
      <article className="side-dial-useful">
        <article className="useful-features">
          <aside>
            <article className="useful-visibility">
              {viewOptionStatus ? (
                <>
                  <VisibilityOffIcon />
                  <span className="tooltip">지역이름 숨기기</span>
                </>
              ) : (
                <>
                  <VisibilityIcon />
                  <span className="tooltip">지역이름 보기</span>
                </>
              )}
            </article>
          </aside>
          <aside>
            <article className="useful-sort">
              {sortOptionStatus ? (
                <>
                  <PlaceIcon />
                  <span className="tooltip">지역 순 정렬</span>
                </>
              ) : (
                <>
                  <AccessTimeIcon />
                  <span className="tooltip">시간 순 정렬</span>
                </>
              )}
            </article>
          </aside>
          <aside>
            <article className="useful-photo-gather">
              <ImageIcon />
              <span className="tooltip">사진 모아보기</span>
            </article>
          </aside>
          <aside>
            <article className="useful-album-edit">
              <EditIcon />
              <span className="tooltip">추억 작성</span>
            </article>
          </aside>
        </article>
      </article>
    </>
  );
}

export default SideDial;
