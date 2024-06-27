import React from 'react'
import './Breadcrumb.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const Breadcrumb = (props) => {
 
 
 
  return (
    <div className='breadcrumb'>
      
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />{props.category}<img src={arrow_icon} alt="" />{props.name}
      
    </div>
  )
}

export default Breadcrumb