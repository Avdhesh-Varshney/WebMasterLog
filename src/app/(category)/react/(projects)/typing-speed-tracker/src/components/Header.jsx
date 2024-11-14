import React from 'react'
import Account from './Account'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  const handleImgClick = () => {
    navigate("/");
  }
  return (
    <div className='header'>
      <div className="logo hoverable">
        <img src="/TypeTrack_transparent.png" alt="" onClick={handleImgClick}/>
      </div>
      <div className="user-logo hoverable">
        <Account />
      </div>
    </div>
  )
}

export default Header