import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Button } from './Button';
import './Navbar.scss';
function Navbar() {
    // states
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    // following function will handle toggling the click state variable value.
    const handleHamburgerClick = ()=>{
        return setClick(!click); // toggle menu
    }
    const closeMobileMenu = ()=>{
        return setClick(false); // close menu
    }
    const showButton = ()=>{
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    }
    useEffect(() => {
        showButton()
    }, [])
    window.addEventListener('resize',showButton); // execute on resize.

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                            TSPOT <i className="fab fa-typo3"></i>
                        </Link>
                        <div className="menu-icon">
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'} onClick={handleHamburgerClick}></i>
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                                    Services
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/products" className="nav-links" onClick={closeMobileMenu}>
                                    Products
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/destinations" className="nav-links" onClick={closeMobileMenu}>
                                    All Destinations
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                        {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar

