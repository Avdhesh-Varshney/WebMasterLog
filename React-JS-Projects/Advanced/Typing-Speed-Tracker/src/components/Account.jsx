import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleButton from 'react-google-button';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { Bounce, toast } from 'react-toastify';
import {auth} from '../firebaseConfig';
import errorMapping from '../utils/errorMapping';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function Account() {
    const [open ,setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const {theme} = useTheme();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleModalOpen = () => {
        if(user){
            navigate('/user');
        }
        else setOpen(true);
    }

    const handleModalClose = () => {
        setOpen(false);
    }

    const handleValueChange = (e, v) => {
        setValue(v);
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider).then((res) => {
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
            toast.error(errorMapping[err.code] || 'Not able to Sign In using Google.', {
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

    const logout = () => {
        auth.signOut().then((res) => {
            toast.success('Logout Successful', {
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
        }).catch((err) => {
            toast.error('Not able to logout', {
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
    <>
        <PermIdentityIcon className='hoverable' style={{
            height: '10%', 
            width: '10%', 
            color: theme.title
        }} onClick={handleModalOpen}/>
        {user && <LogoutIcon style={{
            height: '10%', 
            // width: '7%',
            marginLeft: '2vw',
            marginBottom: '0.5vh',
            color: theme.title
        }} onClick={logout}/>}
        <Modal
            open={open}
            onClose={handleModalClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{width: '400px', textAlign: 'center'}}>
                <AppBar 
                    position='static' style={{
                    background: 'transparent', 
                }}>
                    <Tabs variant='fullWidth' value={value} onChange={handleValueChange}>
                        <Tab label='login' style={{color: theme.typeBoxText}}></Tab>
                        <Tab label='signup' style={{color: theme.typeBoxText}}></Tab>
                    </Tabs>
                </AppBar>
                {value === 0 && <LoginForm handleModalClose={handleModalClose}/>}
                {value === 1 && <SignupForm handleModalClose={handleModalClose}/>}
                <Box>
                    <span>OR</span>
                    <GoogleButton 
                        style={{
                            width: '89%',
                            marginTop: '2vh',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            borderRadius: '5px'
                        }}
                        onClick={handleGoogleSignIn}
                    />
                </Box>
            </div>
        </Modal>
    </>
  )
}

export default Account