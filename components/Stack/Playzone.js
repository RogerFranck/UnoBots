import React, { useContext } from 'react'
import GameContext from '../../context/GameContext'
import NumberCard from '../Cards/NumberCard'


export default function PlayZone() {

  const { PlayZone } = useContext(GameContext)

  return (
    <div>
      <NumberCard
        key={PlayZone[PlayZone.length - 1].number + 1}
        Number={PlayZone[PlayZone.length - 1].number}
        Color={PlayZone[PlayZone.length - 1].color}
      />
    </div>
  )
}
