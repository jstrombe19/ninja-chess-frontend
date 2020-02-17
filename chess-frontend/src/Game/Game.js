import React from 'react';
import Board from '../Board/Board.js';
import initializeBoard from '../Helpers/InitializeBoard.js';
import CapturedWhitePieces from '../Board/CapturedPieces/CapturedWhitePieces.js';
import CapturedBlackPieces from '../Board/CapturedPieces/CapturedBlackPieces.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: initializeBoard(),
      users: this.props.users,
      whiteCaptured: [],
      blackCaptured: [],
      whiteScore: 0,
      blackScore: 0,
      player: 1,
      turn: 'white',
      selectedPiece: -1,
      status: '',
      kingsPosition: {
        white: 60,
        black: 4
      },
      winner: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.users !== prevProps.users) {
      this.setState({ users: this.props.users });
    }
  }

  selectSquare = index => {
    const squares = this.state.squares.slice();

    if (this.state.selectedPiece === -1) {
      if (squares[index] && squares[index].player !== this.state.player) {
        console.log(squares[index]);
        this.setState({
          status: "Wrong player's piece. Choose " + this.state.turn + ' pieces.'
        });
      } else if (squares[index]) {
        squares[index].style = {
          ...squares[index].style,
          backgroundColor: 'RGB(111, 143, 114)'
        };
        this.setState({
          status: 'Choose destination for the selected piece.',
          selectedPiece: index
        });
      }
    } else if (this.state.selectedPiece > -1) {
      delete squares[this.state.selectedPiece].style;
      if (squares[index] && squares[index].player === this.state.player) {
        this.setState({
          status: 'Please make a move.',
          selectedPiece: -1
        });
      } else {
        const squares = this.state.squares.slice();
        const whiteCaptured = this.state.whiteCaptured.slice();
        const blackCaptured = this.state.blackCaptured.slice();
        const isDestinationEnemyOccupied = squares[index] ? true : false;
        const isValidMove = squares[this.state.selectedPiece].isValidMove(
          this.state.selectedPiece,
          index,
          isDestinationEnemyOccupied
        );
        const movePath = squares[this.state.selectedPiece].generateMovePath(
          this.state.selectedPiece,
          index,
          isValidMove
        );
        const isMoveLegal = this.isMoveLegal(movePath);

        if (isValidMove && isMoveLegal) {
          if (squares[index] !== null) {
            if (squares[index].player === 1) {
              this.updateScore(squares[index]);
              whiteCaptured.push(squares[index]);
            } else {
              this.updateScore(squares[index]);
              blackCaptured.push(squares[index]);
            }
            this.checkForKing(squares[index]);
          }

          console.log('whiteCaptured', whiteCaptured);
          console.log('blackCaptured', blackCaptured);
          squares[index] = squares[this.state.selectedPiece];
          squares[this.state.selectedPiece] = null;
          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === 'white' ? 'black' : 'white';
          this.setState({
            selectedPiece: -1,
            squares: squares,
            whiteCaptured: whiteCaptured,
            blackCaptured: blackCaptured,
            player: player,
            status: '',
            turn: turn
          });
        } else {
          this.setState({
            status: 'Please make a move.',
            selectedPiece: -1
          });
        }
      }
    }
  };

  checkForKing = capturedPiece => {
    if (capturedPiece.constructor.name === 'King') {
      alert('Congratulations! You won!');
      const player = this.state.player;
      this.setState({ winner: player });
    } else {
      return false;
    }
  };

  isMoveLegal = movePath => {
    let isLegal = true;
    for (let index = 0; index < movePath; index++) {
      if (this.state.squares[movePath[index]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  };

  updateScore = pieceCaptured => {
    const playerScore =
      this.state.player === 1 ? this.state.whiteScore : this.state.blackScore;
    const points = pieceCaptured.state.value;
    const updatedScore = playerScore + points;
    return this.state.player === 1
      ? this.setState({ whiteScore: updatedScore })
      : this.setState({ blackScore: updatedScore });
  };

  updateSquareState = newSquares => {
    this.setState({ squares: newSquares });
  };

  unobstructedPath = path => {
    const { squares } = this.state;
    let response = true;
    path.map(pathStep => {
      return squares[pathStep] !== null ? (response = false) : null;
    });
    return response;
  };

  check = () => {
    return false;
  };

  sendGameStats = () => {
    const { winner, users } = this.state;
    console.log(winner);
    console.log(users);
    const stats =
      winner === 1
        ? { Winner: users[0].id, Loser: users[1].id }
        : { Winner: users[1].id, Loser: users[0].id };
    fetch('http://localhost:3000/api/v1/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stats: stats })
    });
  };

  render() {
    const { squares } = this.state;
    return (
      <div>
        <div className='game'>
          <div className='captured-pieces-block'>
            {<CapturedWhitePieces whiteCaptured={this.state.whiteCaptured} />}
          </div>

          <div className='game-board'>
            <Board
              squares={squares}
              selectSquare={i => this.selectSquare(i)}
              updateSquareState={this.updateSquareState}
            />
          </div>

          <div className='captured-pieces-block'>
            {<CapturedBlackPieces blackCaptured={this.state.blackCaptured} />}
          </div>

          <div className='game-info'>
            <h3>Turn</h3>
            <div
              id='player-turn-box'
              style={{ backgroundColor: this.state.turn }}
            />
            <div className='game-status'>{this.state.status}</div>
            <div className='scoreboard'>
              <h3>Score</h3>
              <h5>White: {this.state.whiteScore}</h5>
              <h5>Black: {this.state.blackScore}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
