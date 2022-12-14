import React, { useContext } from 'react'
import GameContext from '../../context/GameContext'
import UnoCard from '../Cards/UnoCard'

export default function Stack() {

  const { DrawPlayerCard, Stack, turno, players } = useContext(GameContext)

  const DrawCard = () => { //* Solo si es turno del jugador puede presionar una carta
    if (players[turno] == 'playerHand') {
      DrawPlayerCard()
    }
  }

  return (
    <>
      {
        Stack.length ?
          <>
            <UnoCard onClick={DrawCard} focus={players[turno] == 'playerHand'} />
          </>
          :
          <div />
      }
    </>
  )
}
