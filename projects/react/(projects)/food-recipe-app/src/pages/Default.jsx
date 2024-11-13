import React from 'react'
import {Link} from 'react-router-dom'
import Footer from '../components/Footer'

const Default = () => {
  return (
   <>
    <div className="flex justify-center items-center min-h-[85vh] bg-black text-white"> 
      <div className="text-center">
      <h1 className="text-8xl m-2">4🍔4</h1>
      <h3 className="text-2xl m-2">Oops!! the page you are looking for is not on the menu.</h3>
      <Link className="text-2xl text-[#7dd956] m-2" to="/">Back to Home</Link>
      </div>
    </div>
    <Footer/>
   </>
  )
}

export default Default
