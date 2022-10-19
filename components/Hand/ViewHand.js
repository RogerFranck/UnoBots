import React from 'react'
import NumberCard from '../Cards/NumberCard'
import styles from '../../styles/ViewHand.module.css'

export default function ViewHand({ listCard }) {

  const listItems = listCard.map((e, i) =>
    <NumberCard key={i} Number={e.number} Color={e.color} Focus />
  );

  return (
    <div className={styles.TableGame} >
      {listItems}
    </div>
  )
}
