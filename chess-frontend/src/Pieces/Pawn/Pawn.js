import Piece from '../Piece.js';

export default class Pawn extends Piece {
  constructor(props) {
    super(
      props,
      props === 1
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg'
    );
    this.state = {
      firstMove: true,
      captured: false,
      value: 1
    };
  }

  makeFirstMove = () => {
    this.setState({ firstMove: false });
  };

  isValidMove = (origin, destination) => {
    const { firstMove } = this.state;
    const player = this.props;
    const movementDirection =
      player === 1 ? origin > destination : origin < destination;
    console.log('player');
    console.log('origin', origin);
    console.log('destination', destination);
    console.log('movementDirection logic', origin > destination);
    console.log('movementDirection', movementDirection);
    const proposedMove = Math.abs(origin - destination);
    let incrementor = 0;
    switch (proposedMove) {
      case 16:
        firstMove && movementDirection
          ? (incrementor = 16)
          : (incrementor = 400);
        this.makeFirstMove();
        return incrementor;
      case 9:
        incrementor = 9;
        this.makeFirstMove();
        return incrementor;
      case 8:
        incrementor = 8;
        this.makeFirstMove();
        return incrementor;
      case 7:
        incrementor = 7;
        this.makeFirstMove();
        return incrementor;
      default:
        alert('That is not a valid Pawn movement.');
        incrementor = 400;
        return incrementor;
    }
  };

  promotion = () => {};
}
