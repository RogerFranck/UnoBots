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

  getOptionPlayCard = (cardInPlayZone) => {
    //? Trae las cartas que puede jugar
    return this.state.hand.filter((e) => e.color == cardInPlayZone.color || e.number == cardInPlayZone.number)
  }

  isOptions = (options) => {
    //? Tiene optiones para jugar?
    return options.length > 0
  }

  sendMessage = () => {
    //? Funcion para enviar informacion al otro robot
    //? Ejamplo: "Yo tengo muchas [rojas], si puedes continua con el color [rojo]"
  }

  getMessage = () => {
    //? Funcion para obtener información del otro robot
    //? Puedo resolver su peticion ? lo hago : continuo normal
  }

  selectedCard = (options) => {
    //? Dentro de sus optiones escoge la carta que mas le beneficia
    //? Por cada una de sus optiones verifica cuantas cartas podria jugar si se conserva color o numero
    //? Selecciona la option que al ser jugada le permita mas posibilidades de jugar otras cartas
    let maxPlayableCards = 0;
    let betterCard;
    options.forEach(element => {
      const test = this.getOptionPlayCard(element)
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
    const options = this.getOptionPlayCard(cardInPlayZone)
    if (this.isOptions(options)) {
      const betterCard = this.selectedCard(options)
      this.playCard(betterCard)
      console.log(`${this.state.name} play ${betterCard.number} - ${betterCard.color}`)
    } else {
      this.draw()
      console.log(`${this.state.name} draw card`)
    }
  }

  show = () => {
    return this.hand;
  }

}
