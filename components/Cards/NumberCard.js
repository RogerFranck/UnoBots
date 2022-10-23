import React from 'react'
import styles from '../../styles/Card.module.css'
import Image from 'next/image'
import { especialCardsText } from '../../constants/constants'
import EspecialCard from './EspecialCard'

const colorCode = {
  Red: '#D93D26',
  Blue: '#005EA6',
  Green: '#41B401',
  Yellow: '#F5C400',
  Especial: 'Black'
}

const noColorsEspecial = ['d', 'e']

export default function NumberCard({ Number, Color, Focus, onClick, turno }) {

  return (
    <div
      className={Focus ? styles.Card : styles.CardFocus}
      style={noColorsEspecial.includes(Number) ?
        { backgroundColor: colorCode['Especial'], color: colorCode['Especial'] } :
        { backgroundColor: colorCode[Color] }}
      onClick={turno == 0 ? onClick : () => console.log('No')}
    >
      {
        Object.keys(especialCardsText).includes(Number) ?
          <>
            <EspecialCard Number={Number} Color={Color} />
          </>
          :
          <>
            <div className={styles.miniTextLeft}>{Number}</div>
            <div className={styles.CenterText} >{Number}</div>
            <div className={styles.miniTextRight} >{Number}</div>
          </>
      }

    </div >
  )
}