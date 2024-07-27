import React from 'react'
import logo from '../assets/logo.png'
function Navbar() {
  return (
    <div className='w-full px-5 flex items-center justify-between box-shadow  mt-5'>
      <div className='flex items-center gap-1 '>
    <img src={logo} alt=""  className=' object-cover w-12 h-12'/>
      <h1 className='text-red-700 font-sans text-[22px] font-extrabold cursor-pointer'>PDF Spot</h1>
      </div>
      <button  className='text-white bg-red-600 p-1 px-3 rounded-lg font-sans text-[16px]'>Sign Up</button>
    </div>
  )
}

export default Navbar