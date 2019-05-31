import React from 'react';

const User = ({ username, id, password, created_at, stats }) => {
  return (
    <div className='user-display'>
      <p>Username: {username}</p>
      <p>User ID: {id}</p>
      <p>User Password: {password}</p>
      <p>User Created At: {created_at}</p>
      <p>User Stats: {stats}</p>
    </div>
  )
}

export default User;
