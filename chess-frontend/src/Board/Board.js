import React from 'react';
import Square from './Square/Square.js';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: props.squares
    }
  }

  renderSquare = (index, squareShade, key) => {
    const { squares, selectSquare } = this.props;
    return(
      <Square
        key={key}
        piece={this.props.squares[index]}
        style={squares[index] ? squares[index].style : null}
        shade={squareShade}
        onClick={() => selectSquare(index)}
      />
    )
  }

  buildBoard = () => {
    const board = [];
    for(let rankNumber = 0; rankNumber < 8; rankNumber++) {
      const ranks = [];
      for(let file = 0; file < 8; file++) {
        const squareShade = (isEven(rankNumber) && isEven(file)) || (!isEven(rankNumber) && !isEven(file)) ? "light-square" : "dark-square";
        ranks.push(this.renderSquare((rankNumber * 8) + file, squareShade, (rankNumber * 8) + file));
      }
      board.push(<div className="Board-rank" key={board.length}>{ranks}</div>);
    }
    return board;
  }

  render() {
    return(
      <div>
        {this.buildBoard()}
      </div>
    );
  }
}

function isEven(number) {
  return number % 2 === 0;
}
