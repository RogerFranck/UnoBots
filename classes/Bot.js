import React, { Component } from 'react'

export default class Bot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      hand: props.hand,
    }
  }

  draw = () => {
    this.props.fun.DrawPlayerCard()
  }

  playCard = (card) => {
    this.props.fun.PlayPlayerCards(card, this.state.name)
  }

  play = () => {
    console.log(`Jugando ${this.state.name} `)
    this.draw()
  }

  show = () => {
    return this.hand;
  }

  render() {
    return (
      <></>
    )
  }
}
