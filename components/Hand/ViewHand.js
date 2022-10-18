import React from 'react'
import NumberCard from '../Cards/NumberCard'
import styles from '../../styles/ViewHand.module.css'

export default function ViewHand() {
  return (
    <div className={styles.TableGame} >
      <NumberCard Number={2} Color='Red' />
      <NumberCard Number={7} Color='Blue' />
      <NumberCard Number={9} Color='Yellow' />
      <NumberCard Number={4} Color='Green' />
      <NumberCard Number={3} Color='Red' />
      <NumberCard Number={0} Color='Yellow' />
    </div>
  )
}
