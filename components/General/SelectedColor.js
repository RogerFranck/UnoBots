import React, { useContext } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from '../../styles/selectedColor.module.css'
import GameContext from '../../context/GameContext';

export default function SelectedColor() {

  const { openSelectedCardModal, changeColorEspecialCard } = useContext(GameContext)

  const colorSelected = (color) => {
    changeColorEspecialCard(color)
  }

  return (
    <>
      <Dialog
        open={openSelectedCardModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Select a color
        </DialogTitle>
        <DialogContent>
          <>
            <div className={styles.rows} >
              <div className={styles.colorBoxRed} onClick={() => colorSelected('Red')} />
              <div className={styles.colorBoxBlue} onClick={() => colorSelected('Blue')} />
            </div>
            <div className={styles.rows} >
              <div className={styles.colorBoxGreen} onClick={() => colorSelected('Green')} />
              <div className={styles.colorBoxYellow} onClick={() => colorSelected('Yellow')} />
            </div>
          </>
        </DialogContent>
      </Dialog>
    </>
  )
}
