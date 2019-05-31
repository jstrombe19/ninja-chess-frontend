import Piece from '../Piece.js';

export default class Queen extends Piece {
  constructor(props) {
    super(props, (props === 1 ?
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" :
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"));
    this.state = {
      captured: false,
      value: 9,
    };
  }

  isValidMove = (origin, destination) => {
    const proposedMove = Math.abs(origin - destination);
    let incrementor = 0;
    switch (proposedMove % 9) {
      case 0:
        incrementor = 9;
        return incrementor;
      case (8 || 7 || 6 || 5 || 4 || 3 || 2) && proposedMove % 8 === 0:
        incrementor = 8;
        return incrementor;
      case (8 || 7 || 6 || 5 || 4 || 3 || 2) && proposedMove % 7 === 0:
        incrementor = 7;
        return incrementor;
      case (7 || 6 || 5 || 4 || 3 || 2 || 1) && proposedMove < 8:
        incrementor = 1;
        return incrementor;
      default:
        alert("That is not a valid Queen movement.");
        incrementor = 400;
        return incrementor;
    }
  }
}
