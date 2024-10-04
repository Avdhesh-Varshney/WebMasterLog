import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import {auth} from '../firebaseConfig';
import { Bounce, toast } from 'react-toastify';
import errorMapping from '../utils/errorMapping';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignupForm({handleModalClose}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {theme} = useTheme();

  const handleSubmit = () => {
    if(!email || !password || !confirmPassword){
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
    if(password != confirmPassword){
      toast.warning('Password Mismatch', {
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

    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      toast.success('User Created', {
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
        <TextField 
          variant='outlined'
          type='password'
          label='Confirm password'
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          style={{backgroundColor: theme.typeBoxText, color: theme.title}}
          onClick={handleSubmit}
        >Sign Up</Button>
    </Box>
  )
}

export default SignupForm