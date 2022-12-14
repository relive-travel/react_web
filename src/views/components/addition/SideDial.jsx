import { useState } from "react";
import { useSelector } from "react-redux";

import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

import "./SideDial.scss";
function SideDial(props) {
  const [dialOpen, setDialOpen] = useState(false);

  const actions = [
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  return (
    <Box sx={{ height: 320, transform: `translateZ(0px)`, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Relive-Travel SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onOpen={() => setDialOpen(true)}
        onClose={() => setDialOpen(false)}
        open={dialOpen}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => setDialOpen(false)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default SideDial;
