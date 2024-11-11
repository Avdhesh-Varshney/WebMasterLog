import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({id,name,image,time}) => {
  return (
    <div className="w-[250px] text-center flex flex-col items-center m-5 bg-[#1f1f1f] shadow-[1px_1px_3px_2px_rgba(255,255,255,0.15)]">
      <div className="image">
          <img src={image} className="w-full h-full object-cover"/>
      </div>
      <div className="p-4 text-[#c8c7c9]"> 
          <h2 className="text-xl">{name}</h2>
          <p className="m-2"><i class="fa-regular fa-clock"></i> Time: {time} minutes</p>
          <Link to={`/recipes/${id}`} className="underline">View Recipe</Link>
      </div>
    </div>
  )
}
export default Card
