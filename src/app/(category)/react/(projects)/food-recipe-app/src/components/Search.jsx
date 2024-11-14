import React, { useContext, useState, useEffect, useRef} from 'react'
import search from '../images/search.svg'
import axios from 'axios'
import { recipeContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

const Search = ({isCenter}) => {
    const primary = "search w-full flex"
    const secondary = "search w-full flex justify-center"
    const [searchString, setSearchString] = useState("");
    const {recipeList, setRecipeList} = useContext(recipeContext)

    const navigate = useNavigate();

    const fetchRecipe = async (searchString)=>{
        const response = await axios.get(`https://api.edamam.com/search?q=${searchString}&app_id=${import.meta.env.VITE_APP_ID}&app_key=${import.meta.env.VITE_APP_KEY}`)
    
        setRecipeList(response.data.hits)
        console.log(recipeList)
    }

    const onTextChange = (e)=>{
        const res = e.target.value;
        setSearchString(res);
    }

    return (
        <>
            <form action="" className={isCenter ? secondary: primary} 
            onSubmit={(e)=>
               {
                   e.preventDefault();
                   fetchRecipe(searchString);
                   setSearchString("");
                   navigate('/Recipes');
               }
                }>
                <input onChange={onTextChange} className="text-black px-5 py-2 w-1/2" type="search" name="" placeholder="Search your favorite recipe..." value={searchString}/>
                <button className="bg-[#73c140] px-3"><img src={search}/></button>
            </form>
        </>
    )
}

export default Search
