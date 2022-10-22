import React, { useContext } from 'react'
import GameContext from '../../context/GameContext'
import UnoCard from '../Cards/UnoCard'

export default function Stack() {

  const { DrawPlayerCard, Stack, turno } = useContext(GameContext)

  const DrawCard = () => {
    if (turno == 0) {
      DrawPlayerCard()
    }
  }

  return (
    <>
      {
        Stack.length ?
          <>
            <UnoCard onClick={DrawCard} focus={turno == 0} />
          </>
          :
          <div />
      }
    </>
  )
}
