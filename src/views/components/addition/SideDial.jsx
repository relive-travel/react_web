import { useState } from "react";
import { useSelector } from "react-redux";

import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import PanoramaIcon from "@mui/icons-material/Panorama";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import "./SideDial.scss";
function SideDial(props) {
  const [dialOpen, setDialOpen] = useState(false);
  const [sortOption, setSortOption] = useState(false);
  const [viewOption, setViewOption] = useState(false);

  const handleClickEdit = () => {
    console.log("click");
  };

  return (
    <Box sx={{ height: 320, transform: `translateZ(0px)`, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Relive-Travel SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={dialOpen ? <EditIcon /> : <SpeedDialIcon />}
        open={dialOpen}
        onOpen={() => setDialOpen(true)}
        onClose={() => setDialOpen(false)}
        onClick={dialOpen ? () => handleClickEdit() : null}
      >
        <SpeedDialAction
          key={`dial-action-sort`}
          icon={sortOption ? <PlaceIcon /> : <AccessTimeIcon />}
          tooltipTitle={sortOption ? "지역 순 정렬" : "시간 순 정렬"}
          onClick={() => setSortOption(!sortOption)}
        />
        <SpeedDialAction
          key={`dial-action-panorama`}
          icon={<PanoramaIcon />}
          tooltipTitle={"전체 사진 보기"}
          // onClick={}
        />
        <SpeedDialAction
          key={`dial-action-visibility`}
          icon={viewOption ? <VisibilityOffIcon /> : <VisibilityIcon />}
          tooltipTitle={viewOption ? "지역이름 숨기기" : "지역이름 보기"}
          onClick={() => setViewOption(!viewOption)}
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
