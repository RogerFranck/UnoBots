const Card = require('./card').default;
const {
  activeValues,
  colors,
  especialCardsText,
  wildcards
} = require('../constants/constants');

const generateCards = () => {
  const half = colors.reduce((acc, color) => {
    return [...acc, ...activeValues.map((value, i) => new Card(color, value, String(`${value}-${color}-${i}`) ))];
  }, []);

  const special = wildcards.map((card, i) => new Card('Especial', card, `${card}-Especial-${i}`));

  return [...half, ...half, ...special].sort(() => Math.random() - 0.5);
  /* return [...half, ...half].sort(() => Math.random() - 0.5); */
}

class Deck {
  constructor() {
    this.cards = generateCards();
  }

  firstCardPlayZone() {
    let first = this.cards[Math.floor(Math.random() * this.cards.length)];
    while (Object.keys(especialCardsText).includes(first.number)) {
      first = this.cards[Math.floor(Math.random() * this.cards.length)];
    }
    const index = this.cards.indexOf(first);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
    //! Creo que no borra la carta tomada 
    //! console.log("Esta", this.cards.includes(first)) 
    return first
  }

  draw(played = null) {
    if (played) {
      this.reload(played);
    }
    return this.cards.pop();
  }

  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  reload(played) {
    this.cards = played.sort(() => Math.random() - 0.5);
  }
}

export default Deck;
