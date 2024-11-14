import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-black p-5 pl-20 text-white'>
      <ul className='flex gap-8 text-xl'>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Recipes">Recipes</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
