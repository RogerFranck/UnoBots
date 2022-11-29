import React from "react";
import { useState, useContext } from "react";
import GameContext from "../../context/GameContext";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import styles from "../../styles/Drawer.module.css";
import MenuIcon from "@mui/icons-material/Menu";

export default function Bar() {
  const logs = useContext(GameContext);
  // console.log("haaaaaaaah", logs)
  let listLogs = logs.logsArr.map((logsArr, i) => <div className={styles.listItems} key={i}>{logsArr}</div>);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => handleDrawerOpen()}>
        {/* <Image src={`/LogsImg/zerg.png`} alt='MenuZerg' width={50} height={50} /> */}
        <MenuIcon style={{ color: "white" }} />
      </Button>
      <Drawer anchor="left" open={open} onClose={() => handleDrawerClose()}>
        <Box p={2} width="20rem" textAlign="center">
          <Typography className={styles.drawerHead}>Logs</Typography> <br />
          <Typography className={styles.drawerBody}>{listLogs}</Typography>
        </Box>
      </Drawer>
    </div>
  );
}
