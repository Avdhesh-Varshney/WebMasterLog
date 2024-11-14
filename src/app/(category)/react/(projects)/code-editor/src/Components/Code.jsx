import Editor from "./Editor";
import{Box,styled} from '@mui/material';

import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const Container = styled(Box)`
                    display:flex;
                    background-color:#060606;
                    height:50vh`

const Code = () =>{
    const{html,setHtml,css,setCss,js,setJs} = useContext(DataContext)
    return(
        <Container>
            <Editor heading ="HTML" icon="/" color="#FF3C41" value={html} onChange={setHtml}/>
            <Editor heading ="CSS" icon="*" color="#0EBEFF"  value={css} onChange={setCss}/>
            <Editor heading ="JavaScript" icon="{}" color="#FCD000"  value={js} onChange={setJs}/>
        </Container>
    )
}
export default Code;