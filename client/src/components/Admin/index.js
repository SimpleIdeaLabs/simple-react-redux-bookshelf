import React from 'react';

const User = (props) => {
  if (!props.userData) return <div></div>;
  return (
    <div className="user_container">
      <div className="avatar">
        <img alt="avatar" src="/images/avatar.png" />
      </div>
      <div className="nfo">
        <div><span>Userame: </span>{props.userData.username}</div>
      </div>
    </div>
  )
}

export default User;