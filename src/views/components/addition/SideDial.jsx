import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMapRegion } from "redux/slice/mapSlice";
import {
  setAlbumSelectModal,
  setDialGatherOption,
  setDialSortOption,
  setDialViewOption,
} from "redux/slice/statusSlice";
import { setMarkerData } from "redux/slice/markerSlice";

import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import HomeIcon from "@mui/icons-material/Home";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

import ImageIcon from "@mui/icons-material/Image";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import "./SideDial.scss";
function SideDial(props) {
  const dispatch = useDispatch();

  const [dialOpen, setDialOpen] = useState(false);

  const viewOptionStatus = useSelector((state) => state.status.option.view);
  const sortOptionStatus = useSelector((state) => state.status.option.sort);

  return (
    <Box>
      <SpeedDial
        ariaLabel="Relive-Travel SpeedDial"
        icon={dialOpen ? <EditIcon /> : <SpeedDialIcon />}
        open={dialOpen}
        onClose={() => setDialOpen(false)}
        onClick={() =>
          dialOpen ? dispatch(setAlbumSelectModal(true)) : setDialOpen(true)
        }
      >
        <SpeedDialAction
          key={`dial-action-home`}
          icon={<HomeIcon />}
          tooltipTitle={"홈 지도 이동"}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setMarkerData(null));
            dispatch(setMapRegion("korea"));
          }}
        />
        <SpeedDialAction
          key={`dial-action-sort`}
          icon={sortOptionStatus ? <PlaceIcon /> : <AccessTimeIcon />}
          tooltipTitle={sortOptionStatus ? "지역 순 정렬" : "시간 순 정렬"}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setDialSortOption(!sortOptionStatus));
          }}
        />
        <SpeedDialAction
          key={`dial-action-gather`}
          icon={<ImageIcon />}
          tooltipTitle={"사진 모아보기"}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setDialGatherOption(true));
          }}
        />
        <SpeedDialAction
          key={`dial-action-visibility`}
          icon={viewOptionStatus ? <VisibilityOffIcon /> : <VisibilityIcon />}
          tooltipTitle={viewOptionStatus ? "지역이름 숨기기" : "지역이름 보기"}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setDialViewOption(!viewOptionStatus));
          }}
        />
        <SpeedDialAction
          key={`dial-action-help`}
          icon={<HelpOutlineIcon />}
          tooltipTitle={"도움말"}
          // onClick={}
        />
      </SpeedDial>
    </Box>
  );
}

export default SideDial;
