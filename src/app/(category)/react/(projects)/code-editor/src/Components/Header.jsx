import {AppBar,Toolbar,styled} from '@mui/material';
import { FaPen } from "react-icons/fa";
import '../App.css';

const Container=styled(AppBar)`
                background:#060606;
                height:9vh;
                font-size:10px;
                font-weight:5px;
                font-family:cursive`

const Header = () =>{
    return(
        <>
        <Container position='static'>
            <Toolbar className='ic'>
                <h1>CodeEditor</h1>
                <FaPen className='icon'/>
            </Toolbar>
        </Container>
        </>
    )
}
export default Header;