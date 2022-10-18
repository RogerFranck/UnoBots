
class Player {
  constructor () {
    this.hand = [];
  }

  draw (card) {
    this.hand.push(card);
  }

  play (index) {
    return this.hand.splice(index, 1)[0];
  }
}

module.exports = Player;
