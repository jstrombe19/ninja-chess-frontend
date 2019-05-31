import Piece from '../Piece.js';

export default class Pawn extends Piece {
  constructor(props) {
    super(props, (props === 1 ?
      "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" :
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
    this.state = {
      firstMove: true,
      captured: false,
      value: 1,
    };
  }

  isValidMove = (origin, destination) => {
    const { firstMove, player } = this.state;
    const movementDirection = (player === 1 && origin > destination) || (player !== 1 && origin < destination);
    const proposedMove = Math.abs(origin - destination);
    let incrementor = 0;
    switch (proposedMove % 16 && movementDirection) {
      case 0 && firstMove === true:
        incrementor = 16;
        return incrementor;
      case 9  && proposedMove < 10:
        incrementor = 9;
        return incrementor;
      case 8: //&& proposedMove < 10:
        incrementor = 8;
        return incrementor;
      case 7 && proposedMove < 10:
        incrementor = 7;
        return incrementor;
      default:
        alert("That is not a valid Pawn movement.");
        incrementor = 400;
        return incrementor;
    }
  }

  promotion = () => {

  }
}
