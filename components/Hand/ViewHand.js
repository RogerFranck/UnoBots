import React, { useContext } from 'react'
import NumberCard from '../Cards/NumberCard'
import styles from '../../styles/ViewHand.module.css'
import PropTypes from 'prop-types';
import GameContext from '../../context/GameContext';

export default function ViewHand({ listCard }) {

  const { PlayPlayerCards } = useContext(GameContext)

  const listItems = listCard.map((e, i) =>
    <NumberCard key={i} Number={e.number} Color={e.color} Focus onClick={() => PlayPlayerCards(e)} />
  );

  return (
    <div className={styles.TableGame} >
      {listItems}
    </div>
  )
}

ViewHand.propTypes = {
  listCard: PropTypes.array.isRequired
};
