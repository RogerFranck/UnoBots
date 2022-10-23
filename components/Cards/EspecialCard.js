import React from 'react'
import styles from '../../styles/Card.module.css'
import Image from 'next/image'
import { especialCardsText } from '../../constants/constants'

const colorCode = {
  Red: '#D93D26',
  Blue: '#005EA6',
  Green: '#41B401',
  Yellow: '#F5C400',
  Especial: 'Black'
}

const textDrawCard = {
  c: '+2',
  d: '+4'
}

export default function EspecialCard({ Number, Color }) {

  return (
    <>
      <div className={styles.miniTextLeft} >
        {
          Object.keys(textDrawCard).includes(Number) ?
            <span style={{ color: 'white' }} > {textDrawCard[Number]} </span>
            :
            <span style={{ color: colorCode[Color] }} >
              <Image
                src={`/UnoCard/${especialCardsText[Number]}.svg`}
                alt={`${especialCardsText[Number]}`}
                width={15}
                height={15}
              />
            </span>
        }
      </div>
      <div className={styles.CenterText} >
        <Image
          src={`/UnoCard/${especialCardsText[Number]}.svg`}
          alt={`${especialCardsText[Number]}`}
          width={50}
          height={50}
        />
      </div>
      <div className={styles.miniTextRight} >
        {
          Object.keys(textDrawCard).includes(Number) ?
            <span style={{ color: 'white' }} > {textDrawCard[Number]} </span>
            :
            <span style={{ color: colorCode[Color] }} >
              <Image
                src={`/UnoCard/${especialCardsText[Number]}.svg`}
                alt={`${especialCardsText[Number]}`}
                width={15}
                height={15}
              />
            </span>
        }
      </div>
    </>
  )
}