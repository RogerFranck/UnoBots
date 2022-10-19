import React from 'react'
import styles from '../../styles/ViewHand.module.css'
import UnoCard from '../Cards/UnoCard';

export default function BotHand({ listCard, left }) {

  const CardListLimited = listCard.slice(0, 14)

  const listItems = CardListLimited.map((e, i) =>
    <UnoCard key={i} bot left={left} index={i} />
  );

  return (
    <div>
      <center>
        <span># Cards: {listCard.length} </span>
      </center>
      <div className={styles.BotGame} >
        {listItems}
      </div>
    </div >
  )
}
