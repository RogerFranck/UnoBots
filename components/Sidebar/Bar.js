
import React from 'react'
import { useState, useContext } from "react"
import GameContext from "../../context/GameContext"
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image'
import styles from '../../styles/Drawer.module.css'


export default function Bar() {

  const logs = useContext(GameContext)
  // console.log("haaaaaaaah", logs)
  let listLogs = logs.logsArr.map((logsArr) =>
    <li>{logsArr}</li>
  );

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return(
    <div>
    <Button onClick={() => handleDrawerOpen()}>
      <Image
        src={`/LogsImg/lineas.png`}
        width={50}
        height={50}
      />
    </Button>
    <Drawer anchor='left' open={open} onClose={() => handleDrawerClose()}>
      <Box p={2} width='20rem' textAlign='center'>
        <Typography className={styles.drawerHead}>
          Logs
        </Typography>
        <Typography className={styles.drawerBody}>
          {listLogs}
        </Typography>
      </Box>
    </Drawer>
    </div>
  )
}