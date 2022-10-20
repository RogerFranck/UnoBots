
class Bot {
  constructor (name, hand) {
    this.name = name;
    this.hand = hand;
  }

  draw (card) {
    this.hand.push(card);
  }

  play (index) {
    return this.hand.splice(index, 1)[0];
  }

  show () {
    return this.hand;
  }

  
}

export default Bot;
