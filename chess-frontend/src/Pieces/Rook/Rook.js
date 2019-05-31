import Piece from '../Piece.js';

export default class Rook extends Piece {
  constructor(props) {
    super(props, (props === 1 ?
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" :
      "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"));
    this.state = {
      firstMove: true,
      captured: false,
      value: 5,
    };
  }

  isValidMove = (origin, destination) => {
    const proposedMove = Math.abs(origin - destination);
    let incrementor = 0;
    switch (proposedMove % 8) {
      case 0:
        incrementor = 8;
        return incrementor;
      case 1 || 2 || 3 || 4 || 5 || 6 || 7:
        incrementor = 1;
        return incrementor = 1;
      default:
        alert("That is not a valid Rook movement.");
        incrementor = 400;
        return incrementor;
    }
  }
}
