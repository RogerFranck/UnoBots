import React from 'react'
import styles from '../../styles/ViewHand.module.css'
import UnoCard from '../Cards/UnoCard';
import PropTypes from 'prop-types';

export default function BotHand({ listCard, left }) {

  const CardListLimited = listCard.slice(0, 7)

  const listItems = CardListLimited.map((e, i) =>
    <UnoCard key={i} bot left={left} index={i} />
  );

  return (
    <div>
      <center>
        <span> {left ? 'Fobos : ' : 'Deimos : '} #{listCard.length} </span>
      </center>
      <div className={styles.BotGame} >
        {listItems}
      </div>
    </div >
  )
}

BotHand.propTypes = {
  listCard: PropTypes.array.isRequired,
  left: PropTypes.bool
};
