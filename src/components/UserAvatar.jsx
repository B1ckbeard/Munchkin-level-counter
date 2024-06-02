import React from 'react';
import './UserAvatar.css';

const UserAvatar = ({src}) => {
  return (
    <div className='avatar__container'>
      <img className='avatar shadow-sm' src={src} alt="avatar" />
    </div>
  )
};

export default UserAvatar;
