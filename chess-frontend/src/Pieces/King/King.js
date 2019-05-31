import Piece from '../Piece.js';

export default class King extends Piece {
  constructor(props) {
    super(props, (props === 1 ?
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" :
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"));
    this.state = {
      firstMove: true,
      captured: false,
      value: 40,
    };
  }

  isValidMove = (origin, destination) => {
    const { firstMove } = this.state;
    const proposedMove = Math.abs(origin - destination);
    let incrementor = 0;
    switch (proposedMove % 9) {
      case 0:
        incrementor = 9;
        return incrementor;
      case 8:
        incrementor = 8;
        return incrementor;
      case 7:
        incrementor = 7;
        return incrementor;
      case 1:
        incrementor = 1;
        return incrementor;
      case 2 && firstMove === true:
        incrementor = 2;
        return incrementor;
      default:
        alert("That is not a valid King Movement.");
        incrementor = 400;
        return incrementor;
    }
  }

}
