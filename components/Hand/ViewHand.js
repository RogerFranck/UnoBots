import React, { useContext } from 'react'
import NumberCard from '../Cards/NumberCard'
import styles from '../../styles/ViewHand.module.css'
import PropTypes from 'prop-types';
import GameContext from '../../context/GameContext';

export default function ViewHand({ listCard }) {

  const { PlayPlayerCards, turno, players } = useContext(GameContext)

  const listItems = listCard.map((e, i) =>
    <NumberCard key={i} Number={e.number} Color={e.color} turno={turno} players={players} Focus={players[turno] == 'playerHand'} onClick={() => PlayPlayerCards(e, 'playerHand')} />
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
