import React from "react";
import { useState, useContext } from "react";
import GameContext from "../../context/GameContext";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "../../styles/Drawer.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";

const colorCode = {
  Red: "#D93D26",
  Blue: "#005EA6",
  Green: "#41B401",
  Yellow: "#F5C400",
  Especial: "Black",
};

const especialCardsText = {
  a: "skip",
  b: "reverse",
  e: "wild",
};

const especialDraw = {
  c: "+2",
  d: "+4",
  x: "+",
};

export default function Bar() {
  const { logsArr } = useContext(GameContext);
  let listLogs = logsArr.map((logsArr, i) => (
    <div key={i} className={styles.listBox}>
      <div className={styles.listItems}>{logsArr[0]}</div>
      <div
        className={styles.subItem}
        style={{ backgroundColor: colorCode[logsArr[2]] }}
      >
        {Object.keys(especialCardsText).includes(logsArr[1]) ? (
          <Image
            alt="Icon"
            src={`/UnoCard/${especialCardsText[logsArr[1]]}.svg`}
            width={15}
            height={15}
          />
        ) : Object.keys(especialDraw).includes(logsArr[1]) ? (
          especialDraw[logsArr[1]]
        ) : (
          logsArr[1]
        )}
      </div>
    </div>
  ));

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Avatar
        style={{ backgroundColor: "black", cursor: 'pointer' }}
        onClick={() => handleDrawerOpen()}
      >
        <MenuIcon style={{ color: "white" }} />
      </Avatar>
      <Drawer anchor="left" open={open} onClose={() => handleDrawerClose()}>
        <Box p={2} width="20rem" textAlign="center">
          <Typography className={styles.drawerHead}>Logs</Typography> <br />
          <Typography className={styles.drawerBody}>{listLogs}</Typography>
        </Box>
      </Drawer>
    </div>
  );
}
