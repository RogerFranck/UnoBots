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
    //? sensor para ver la carta en la playZone
    return this.props.PlayZoneData[this.props.PlayZoneData.length - 1]
  }

  getOpcionPlayCard = (cardInPlayZone) => {
    //? Trae las cartas que puede jugar
    return this.state.hand.filter((e) => e.color == cardInPlayZone.color || e.number == cardInPlayZone.number)
  }

  isOpcions = (opcions) => {
    //? Tiene opciones para jugar?
    return opcions.length > 0
  }

  selectedCard = (opcions) => {
    //? Dentro de sus opciones escoge la carta que mas le beneficia
    let maxPlayableCards = 0;
    let betterCard;
    opcions.forEach(element => {
      const test = this.getOpcionPlayCard(element)
      if (test.length > maxPlayableCards) {
        maxPlayableCards = test.length
        betterCard = element
      }
    });
    return betterCard
  }

  draw = () => {
    this.props.fun.DrawPlayerCard()
  }

  playCard = (card) => {
    this.props.fun.PlayPlayerCards(card, this.state.name)
  }

  play = () => {
    const cardInPlayZone = this.seePlayZoneCard()
    const opcions = this.getOpcionPlayCard(cardInPlayZone)
    if (this.isOpcions(opcions)) {
      const betterCard = this.selectedCard(opcions)
      this.playCard(betterCard)
    } else {
      this.draw()
    }
  }

  show = () => {
    return this.hand;
  }

}
