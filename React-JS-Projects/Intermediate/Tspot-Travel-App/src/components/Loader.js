import React,{useState, useEffect} from 'react'
// imports for material ui backdrop.
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#ff0000',
    },
}));
function Loader(props) {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={props.open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loader
