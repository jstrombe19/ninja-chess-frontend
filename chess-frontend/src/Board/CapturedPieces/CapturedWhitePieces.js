import React from 'react';
import './CapturedPieces.css';
import Square from '../Square/Square.js';

export default class CapturedWhitePieces extends React.Component {

  renderSquare = (square, index, key) => {
    return(
      <Square
        key={Date.now() + Math.random() + index}
        piece={square}
        style={square.style}
      />
    )
  }

  render() {
    return(
      <div>
        <div className="board-row">{this.props.whiteCaptured.map((whitePieces, index) => {
          return this.renderSquare(whitePieces, index)
        })}
        </div>
      </div>
    )
  }

}
