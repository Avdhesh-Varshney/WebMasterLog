import React from 'react'
import halfpizza from '../images/halfpizza.jpg'
import Search from './Search'

const Header = () => {
    return (
        <div className="bg-black flex text-white h-[87vh] w-full">
            <div className="flex flex-col justify-center items-center px-20 gap-5 text-center">
                <h1 className="text-2xl md:text-4xl lg:text-5xl leading-[1.5] font-[myFont] uppercase" id="header-heading">Discover Your New Favorite Dish with Our <span className="text-[color:#7dd956]">Tasty Recipes!</span></h1>
                <Search isCenter={true}/>
            </div>
            {/* <img src={halfpizza} alt="" className="w-[300px] header-img" /> */}
        </div>
    )
}

export default Header
