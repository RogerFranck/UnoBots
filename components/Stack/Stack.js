import React, { useContext } from 'react'
import GameContext from '../../context/GameContext'
import UnoCard from '../Cards/UnoCard'

export default function Stack() {

  const { DrawPlayerCard, Stack } = useContext(GameContext)

  const DrawCard = () => {
    DrawPlayerCard()
  }

  return (
    <>
      {
        Stack.length ?
          <>
            <UnoCard onClick={DrawCard} />
          </>
          :
          <div />
      }
    </>
  )
}
