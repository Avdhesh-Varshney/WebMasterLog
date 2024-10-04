import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import {auth} from '../firebaseConfig';
import errorMapping from '../utils/errorMapping';
import { Bounce, toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginForm({handleModalClose}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {theme} = useTheme();

  const handleSubmit = () => {
    if(!email || !password){
      toast.warning('Fill all details', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      toast.success('Login Successful', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      handleModalClose();
    }).catch((err) => {
      toast.error(errorMapping[err.code] || 'Some Error Occured.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    })
  }

  return (
    <Box
      p={3}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
        <TextField 
          variant='outlined'
          type='email'
          label='Enter email'
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme.title
            }
          }}
          inputProps={{
            style: {
              color: theme.title
            }
          }}
        />
        <TextField 
          variant='outlined'
          type='password'
          label='Enter password'
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme.title
            }
          }}
          inputProps={{
            style: {
              color: theme.title
            }
          }}
        />
        <Button 
        variant='contained' 
        size='large' 
        style={{backgroundColor: theme.title, color: theme.typeBoxText}}
        onClick={handleSubmit}>Login</Button>
    </Box>
  )
}

export default LoginForm