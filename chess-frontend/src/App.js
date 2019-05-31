import React from 'react';
import './App.css';
import User from './User/User.js';
import UserList from './UserList/UserList.js';
import Game from './Game/Game.js';
import logo from './chess-pieces-logo-fullsize.jpg';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
      landingPage: false,
      loginPage: false,
      isLoggedIn: false,
      playGamePage: true,
    }
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true})
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false})
  }

  async componentDidMount() {
    try{
      const response = await fetch('http://localhost:3000/api/v1/users');
      const users = await response.json();
      this.setState({ users });
    }
    catch(error){
      console.error(error.message);
    }
  }

  renderUser = (user) => {
    return(
      <User
        key={user.id + Date.now()}
        {...user}
      />
    )
  }

  render() {
    const { users, loginPage, playGamePage, landingPage, isLoggedIn } = this.state;
    let button;

    if(landingPage) {
      return(
        <div className="App">
          <div className="App-header">
            <img src={logo} alt='chess pieces'/>
            <div className="Logo">
              <div className="App-login">
                THIS IS WHERE USERS LAND!!!
              </div>
            </div>
          </div>
        </div>
      )
    }

    if(loginPage) {
      return(
        <div className="App">
          <div className="App-header">
            <div className="App-login">
              THIS IS WHERE USERS LOGIN!!!
            </div>
          </div>
        </div>
      )
    }

    if(playGamePage) {
      return (
        <div className="App">
          <div className="App-header">
          Ninja Chess
          </div>
          <div className="body">
            <div className="column-1">
              <UserList
                users={users}
                renderUser={this.renderUser}
              />
            </div>
            <div className="column-2">
              <Game users={users} />
            </div>
            <div className="column-3">
              <UserList
                users={users}
                renderUser={this.renderUser}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
