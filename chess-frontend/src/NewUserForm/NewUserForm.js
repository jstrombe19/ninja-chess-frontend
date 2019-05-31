import React from 'react';

export default class NewUserForm extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      stats: {
        wins: 0,
        losses: 0,
      }
    }
  }

  render() {
    return(
      <form className='new-user-info-form'>
        <input name='username'/>
        <input name='password'/>
        <input name={this.name} placeholder='Update User' value={this.state}/>
      </form>
    )
  }
}
