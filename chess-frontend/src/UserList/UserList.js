import React from 'react';

const UserList = ({ users, renderUser }) => {
  const userList = users.map(renderUser)
  return (
    <div>
      {userList}  
    </div>
  )
}

export default UserList;
