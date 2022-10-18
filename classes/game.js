const Deck = require('./deck');

class Game {
  constructor () {
    this.deck = new Deck();
    this.played = [this.deck.draw()];
  }
}