import React from 'react'
import Hero from '../components/Hero.jsx/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import Newcollection from '../components/NewCollections/Newcollection'
import Newsletter from '../components/Newsletter/Newsletter'

 const Shop = () => {
  return (
    <div>
        <Hero/>
        <Popular/>
        <Offers/>
        <Newcollection/>
        <Newsletter/>
    </div>
  )
}
export default Shop
