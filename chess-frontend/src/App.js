import React from 'react';
import './App.css';
import User from './User/User.js';
import UserList from './UserList/UserList.js';
import Game from './Game/Game.js';
import logo from './chess-pieces-logo-fullsize.jpg';

const HEROKU = 'https://ninja-chess.herokuapp.com/';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      landingPage: false,
      loginPage: true,
      isLoggedIn: false,
      playGamePage: false
    };
  }

  sendStats = stats => {
    console.log('stats were sent!');
  };

  handlePlayClick = () => {
    this.setState({
      landingPage: false,
      playGamePage: true
    });
  };

  handleLoginClick = () => {
    this.setState({
      isLoggedIn: true,
      landingPage: true,
      loginPage: false
    });
  };

  handleLogoutClick = () => {
    this.setState({
      isLoggedIn: false,
      loginPage: true,
      playGamePage: false
    });
  };

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users');
      const users = await response.json();
      this.setState({ users });
    } catch (error) {
      console.error(error.message);
    }
  }

  renderUser = user => {
    return <User key={user.id + Date.now()} {...user} />;
  };

  render() {
    const {
      users,
      loginPage,
      playGamePage,
      landingPage,
      isLoggedIn
    } = this.state;
    const user1 = users[0];
    const user2 = users[1];
    let button;

    if (landingPage) {
      return (
        <div className='App'>
          <div className='App-header'>
            <img src={logo} alt='chess pieces' />
            <div className='App-login'>THIS IS WHERE USERS LAND!!!</div>
            <button onClick={this.handlePlayClick}>Play a Game</button>
          </div>
        </div>
      );
    }

    if (loginPage) {
      return (
        <div className='App'>
          <div className='App-header'>
            <div className='body'>THIS IS WHERE USERS LOGIN!!!</div>
            <button onClick={this.handleLoginClick}>Login</button>
          </div>
        </div>
      );
    }

    if (playGamePage) {
      return (
        <div className='App'>
          <div className='App-header'>Ninja Chess</div>
          <div className='body'>
            <div className='column-1'>
              <UserList users={users} renderUser={this.renderUser} />
            </div>
            <div className='column-2'>
              <Game users={users} />
            </div>
            <div className='column-3'>
              <UserList users={users} renderUser={this.renderUser} />
            </div>
          </div>
          <div className='App-footer'>
            <button onClick={this.handleLogoutClick}>Logout</button>
          </div>
        </div>
      );
    }
  }
}

export default App;
