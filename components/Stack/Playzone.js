import React, { useContext } from 'react'
import GameContext from '../../context/GameContext'
import NumberCard from '../Cards/NumberCard'


export default function PlayZone() {

  const { PlayZoneData } = useContext(GameContext)

  return (
    <div>
      <NumberCard
        key={PlayZoneData[PlayZoneData.length - 1].number + 1}
        Number={PlayZoneData[PlayZoneData.length - 1].number}
        Color={PlayZoneData[PlayZoneData.length - 1].color}
      />
    </div>
  )
}
