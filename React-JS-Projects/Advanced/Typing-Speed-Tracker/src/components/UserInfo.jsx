import { AccountCircle } from '@mui/icons-material'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { useTheme } from '../context/ThemeContext';

function UserInfo({totalTestsTaken}) {
  const [user] = useAuthState(auth);
  const {theme} = useTheme();
  return (
    <div className="user-profile">
      <div className="user">
        <div className="picture" style={{paddingBottom: '2vh'}}>
          <AccountCircle style={{ transform: 'scale(2)'}} />
        </div>
        <div className="info" style={{color: theme.title}}>
          <div className="email">
          <span style={{color: theme.background}}>Email:</span> {user.email}
          </div>
          <div className="joined-at" style={{padding: '1vh'}}>
          <span style={{color: theme.background}}>Joined:</span> {user.metadata.creationTime}
          </div>
        </div>
      </div>
      <div className="total-tests">
        <span style={{color: theme.background}}>Tests taken:</span> {totalTestsTaken}
      </div>
    </div>
  )
}

export default UserInfo