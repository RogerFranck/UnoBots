
import React from 'react'
import { useState, useContext } from "react"
import GameContext from "../../context/GameContext"
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image'
//import MenuIcon from '@mui/icons-material/Menu';



export default function Bar() {

  const logs = useContext(GameContext)
  // console.log("haaaaaaaah", logs)
  let listLogs = logs.logsArr.map((logsArr) =>
    <li>{logsArr}</li>
  );

  const [open, setOpen] = useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return(
    <div>
    <Button onClick={() => setOpen(true)}>
      <Image
        src={`/LogsImg/zerg.png`}
        width={50}
        height={50}
      />
    </Button>
    <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
      <Box p={2} width='20rem' textAlign='center'>
        <Typography>
          Logs :D
        </Typography>
        <Typography>
          {listLogs}
        </Typography>
      </Box>
    </Drawer>
    </div>
    // <div className={styles.navbar}>
    //   <div className={styles.navbarPlus}>
    //     Logs
    //     <div className={styles.navbarPlusChild}>uhhhhhhhhhhh</div>
    //   </div>
    // </div>
  )
}