import React, { useEffect, useState } from 'react'
import './Newcollection.css'

import Item from '../Item/Item'
const Newcollection = () => {
  const [new_collection, setnewcollection] = useState([]);
 useEffect(() => {
    fetch('http://localhost:4000/newcollections')
    .then(response => response.json())
    .then((data)=>setnewcollection(data));
  },[])

  return (
    <div className='newcollection'>
      <h1 className='h1t'>NEW COLLECTIONS</h1>
      <hr/>
      <div className='collections'>
        {new_collection.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}

      </div>
      </div>
  )
}

export default Newcollection