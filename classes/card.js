class Card {
  constructor(color, value) {
    this.id = String(`${color}-${value}`)
    this.color = color;
    this.number = value;
  }
}

export default Card;
