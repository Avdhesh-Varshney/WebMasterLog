import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { recipeContext } from '../context/context'
import Card from '../components/Card'
import Search from '../components/Search'
import Footer from '../components/Footer'

const Recipes = () => {
  const {recipeList, setRecipeList} = useContext(recipeContext)

  return (
    <div className="bg-black text-[#fdfdfd] min-h-screen">
     <h1 className="mb-2 text-2xl text-center py-10 text-[color:#7dd956]">So, What are you making today?</h1>
          <Search isCenter={true}/>
        <div className="cards flex flex-wrap justify-center items-center mt-10 min-h-[40vh]">
             {
               recipeList.length > 0 ? (
                recipeList.map((item,index)=>{
                  return (
                    <Card key={index} id={index} name={item.recipe.label} image={item.recipe.image} time={item.recipe.totalTime}/>
                  )
                })
               ): (
                  <p className="text-xl px-10 text-zinc-400">Sorry!! We couldn't found such Recipe.</p>
               )
             }
        </div>
        <Footer/>
    </div>
  )
}

export default Recipes
