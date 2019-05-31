import Piece from '../Piece.js';

export default class Knight extends Piece {
  constructor(props) {
    super(props, (props === 1 ?
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" :
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
    this.state = {
      captured: false,
      value: 3,
    };
  }

  isValidMove = (origin, destination) => {
    const proposedMove = Math.abs(origin - destination);
    let incrementor = 0;
    switch (proposedMove % 17) {
      case 0:
        incrementor = 17;
        return incrementor;
      case 15:
        incrementor = 15;
        return incrementor;
      case 10:
        incrementor = 10;
        return incrementor;
      case 6:
        incrementor = 6;
        return incrementor;
      default:
        alert("That is not a valid Knight movement.");
        incrementor = 400;
        return incrementor;
    }
  }

}
