import Bishop from '../Pieces/Bishop/Bishop.js';
import King from '../Pieces/King/King.js';
import Knight from '../Pieces/Knight/Knight.js';
import Pawn from '../Pieces/Pawn/Pawn.js';
import Queen from '../Pieces/Queen/Queen.js';
import Rook from '../Pieces/Rook/Rook.js';

function initializeBoard() {
  // Instantiate blank board squares
  const squares = Array(64).fill(null);
  // Populate respective squares with pawns of either type
  for(let index = 8; index < 16; index++) {
    squares[index] = new Pawn(2);
    squares[index + 40] = new Pawn(1);
  }
  // Populate respective squares with rooks of either type
  for(let index = 0; index < 8; index += 7) {
    squares[index] = new Rook(2);
    squares[index + 56] = new Rook(1);
  }
  // Populate respective squares with knights of either type
  for(let index = 1; index < 7; index += 5) {
    squares[index] = new Knight(2);
    squares[index + 56] = new Knight(1);
  }
  // Populate respective squares with bishops of either type
  for(let index = 2; index < 6; index += 3) {
    squares[index] = new Bishop(2);
    squares[index + 56] = new Bishop(1);
  }
  // Place queens
  squares[3] = new Queen(2);
  squares[59] = new Queen(1);
  // Place kings
  squares[4] = new King(2);
  squares[60] = new King(1);

  return squares
}

export default initializeBoard;
