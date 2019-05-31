import Piece from '../Piece.js';

export default class Bishop extends Piece {
  constructor(props) {
    super(props, (props === 1 ?
      "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" :
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
    this.state = {
      captured: false,
      value: 3,
    };
  }


  isValidMove = (origin, destination) => {
    const proposedMove = Math.abs(origin - destination);
    let incrementor = 0;
    switch (proposedMove % 9) {
      case 0:
        incrementor = 9;
        return incrementor;
      case 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8:
        incrementor = 7;
        return incrementor;
      default:
        alert("That is not a valid Bihsop movement.");
        incrementor = 400;
        return incrementor;
    }
  }
}
