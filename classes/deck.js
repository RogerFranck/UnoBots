const Card = require('./card');
const {
  activeValues,
  colors
} = require('../constants/constants');

const generateCards = () => {
  const half = colors.reduce((acc, color) => {
    return [...acc, ...activeValues.map((value) => new Card(color, value))];
  }, []);

  return [...half, ...half].sort(() => Math.random() - 0.5);
}

class Deck {
  constructor () {
    this.cards = generateCards();
  }

  draw (played = null) {
    if (played) {
      this.reload(played);
    }

    return this.cards.pop();
  }

  shuffle () {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  reload (played) {
    this.cards = played.sort(() => Math.random() - 0.5);
  }
}

module.exports = Deck;
