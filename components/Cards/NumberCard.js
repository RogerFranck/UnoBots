import React from 'react'
import styles from '../../styles/Card.module.css'

const colorCode = {
  Red: '#D93D26',
  Blue: '#005EA6',
  Green: '#41B401',
  Yellow: '#F5C400',
  Especial: 'Black'
}

export default function NumberCard({ Number, Color, Focus, onClick, turno }) {
  return (
    <div
      className={Focus ? styles.Card : styles.CardFocus}
      style={{ backgroundColor: colorCode[Color] }}
      onClick={turno == 0 ? onClick : () => console.log('No')}
    >
      <div className={styles.miniTextLeft}>{Number}</div>
      <div className={styles.CenterText} >{Number}</div>
      <div className={styles.miniTextRight} >{Number}</div>
    </div >
  )
}