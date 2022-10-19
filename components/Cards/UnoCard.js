import React from 'react'
import styles from '../../styles/Card.module.css'
import Image from 'next/image'

export default function UnoCard({ onClick, bot, left, index }) {

  return (
    <div
      className={bot ? styles.UnoCardUnFocus : styles.UnoCard}
      onClick={onClick}
      style={{ zIndex: index }}
    >
      <div className={bot ? left ? styles.CenterImageBotLeft : styles.CenterImageBot : styles.CenterImage} >
        <Image
          src='/UnoCard/UNO_Logo.png'
          alt='Uno'
          width={70}
          height={50}
        />
      </div>
    </div>
  )
}
