import React,{useState, useEffect} from 'react'
import '../../App.scss';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Loader from '../Loader';


function Home() {
    // for loader to open or close
    const [open, setOpen] = useState(true);

    // following useState is for loader 
    useEffect(()=>{
        setInterval(() => {
            if (document.readyState === 'complete') {
                setOpen(false);
            }
            }, 100);
    },[])
    

    return (
        <>
        {open===true ? <Loader open/>: <Loader />}
            <HeroSection/>
            <Cards/>
            
        </>
    )
}

export default Home
