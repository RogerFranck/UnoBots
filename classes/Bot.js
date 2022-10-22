import React, { Component } from 'react'

export default class Bot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      hand: props.hand,
    }
  }

  seePlayZoneCard = () => {
    return this.props.PlayZoneData[this.props.PlayZoneData.length - 1]
  }

  getOpcionPlayCard = () => {
    const cardInPlayZone = this.seePlayZoneCard()
    return this.state.hand.filter((e) => e.color == cardInPlayZone.color || e.number == cardInPlayZone.number)
  }

  isPlayable = (opcions) => {
    return opcions.length > 0
  }

  selectedCard = (opcions) => {
    const randomNumber = Math.floor(Math.random() * opcions.length)
    return opcions[randomNumber]
  }

  draw = () => {
    this.props.fun.DrawPlayerCard()
  }

  playCard = (card) => {
    this.props.fun.PlayPlayerCards(card, this.state.name)
  }

  play = () => {
    const opcions = this.getOpcionPlayCard()
    if (this.isPlayable(opcions)) {
      const playCard = this.selectedCard(opcions)
      this.playCard(playCard)
    } else {
      this.draw()
    }
  }

  show = () => {
    return this.hand;
  }

}
