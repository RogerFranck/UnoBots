import React from 'react'
import UnoCard from '../Cards/UnoCard'

export default function Stack() {

  const ExampleStack = [
    { number: '2', color: 'Red' },
    { number: '7', color: 'Blue' },
    { number: '9', color: 'Yellow' },
    { number: '4', color: 'Green' },
    { number: '3', color: 'Red' },
    { number: '0', color: 'Yellow' },
    { number: '2', color: 'Green' },
  ]

  const DrawCard = () => {
    const DrawedCard = ExampleStack.pop()
    console.log(DrawedCard)
  }

  return (
    <UnoCard onClick={DrawCard} />
  )
}
