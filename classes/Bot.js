import React, { Component } from 'react'
import { isEmpty, uniq } from 'lodash';

const {
  coop
} = require('../constants/constants');

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
    return !isEmpty(options);
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

  chooseColorEspecialCard = (color) => {
    this.props.fun.changeColorEspecialCard(color)
  }

  getColor = (ally) => {
    const target = (ally.show().length < this.show().length) && coop ? ally : this; // Agregar validación para coop

    const colorCount = target.show().reduce((acc, card) => {
      if (Object.keys(acc).includes(card.color)) {
        acc[card.color] += 1;
      }

      return acc;
    }, {
      'Blue' : 0, 
      'Green': 0, 
      'Red': 0, 
      'Yellow': 0
    });

    const selectedColor = Object.entries(colorCount).reduce((acc, [key, value]) => {
      return acc[1] < value ? [key, value] : acc;
    }, ['Red', 0])[0];

    return this.chooseColorEspecialCard(selectedColor);
  }

  findWildcard = () => {
    return this.show().filter((card) => card.color === 'Especial');
  }

  answer = (target) => {
    return this.getOptionPlayCard(target).length;
  }

  benefit = (hand, odds) => {
    return hand[odds.indexOf(Math.max(...odds))]
  }

  suggest = (ally, options, turn) => {
    const status = ally.show().length < this.show().length;
    if (turn && status) {
      options = options.filter(({ number }) => number !== 'c' );
    }

    if (isEmpty(options)) {
      return 'draw';
    }
    const odds = options.map((card) => ally.answer(card));


    const validateOdds = uniq(odds);
    if (validateOdds.length === 1 && validateOdds.includes(0)) {
      if (status) {
        const wildcards = this.findWildcard();
        if (!isEmpty(wildcards)) {
          const wild = turn ? 'd' : 'e';
          const suitable = wildcards.find(({ number }) => number !== wild);

          if (suitable) {
            console.log(1)
            return suitable;
          } else {
            console.log(2)
            return this.selectedCard(options);
          }
        } else {
          console.log(3)
          return this.benefit(options, odds);
        }
      } else {
        console.log(4)
        return this.benefit(options, odds);
      }
    } else {
      console.log(5)
      console.log({ options, odds })
      return this.benefit(options, odds);
    }
  }
  

  play = (ally, turn) => {
    const cardInPlayZone = this.seePlayZoneCard()
    const options = this.getOptionPlayCard(cardInPlayZone)
    if (this.isOptions(options)) {
      this.suggest(ally, options)
      const betterCard = coop ? this.suggest(ally, options, turn) : this.selectedCard(options);
      if (betterCard === 'draw') {
        this.draw();
        console.log(`${this.state.name} draw card`)
        return;
      }
      console.log({ betterCard })
      this.playCard(betterCard)
      if (betterCard.color === 'Especial') {
        this.getColor(ally);
      }
      console.log(`${this.state.name} play ${betterCard.number} - ${betterCard.color}`)
    } else {
      this.draw()
      console.log(`${this.state.name} draw card`)
    }
  }

  show = () => {
    return this.state.hand;
  }

}
