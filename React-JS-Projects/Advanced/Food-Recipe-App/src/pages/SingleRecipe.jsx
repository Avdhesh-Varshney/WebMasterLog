
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { recipeContext } from '../context/context';
import Footer from '../components/Footer';

const SingleRecipe = () => {
  const {recipeList, setRecipeList} = useContext(recipeContext)
  const {id} = useParams();
  const numericId = parseInt(id,10);

  const [recipeData, setRecipeData] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (recipeList && recipeList.length > numericId) {
          const filteredRecipe = recipeList[numericId].recipe;
          if (isMounted) {
            setRecipeData(filteredRecipe);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setRecipeData(null);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching recipe data:', error);
        if (isMounted) {
          setLoading(false);
          setRecipeData(null);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [recipeList, numericId]);

  // useEffect(() => {
  //   // Check if recipeList has been populated and if the requested ID exists
  //   if (recipeList && recipeList.length > numericId) {
  //     const filteredRecipe = recipeList[numericId].recipe;
  //     setRecipeData(filteredRecipe);
  //     setLoading(false);
  //   } else {
  //     // Handle case where the requested ID doesn't exist
  //     setLoading(false);
  //     setRecipeData(null);
  //   }
  // }, [recipeList, numericId]);

  return (
    <>
    <div className="bg-black text-[#fdfdfd] min-h-[90vh] p-10 flex justify-evenly flex-wrap sm:gap-20 lg:gap-0">
        {loading ? (
          <p>Loading...</p>
        ) : recipeData ? (
          <>
            <div className="left w-1/2">
            <div className="image">
              <img src={recipeData.image} alt=""/>
            </div>
            <h1 className="text-3xl my-4">{recipeData.label}</h1>
            <p><i class="fa-regular fa-clock"></i> Total Time: {recipeData.totalTime} minutes</p>
            </div>
            <div className="right leading-10">
              <h2 className="text-2xl mb-4"><i class="fa-solid fa-utensils"></i> Ingredients</h2>
              <ul className="list-disc mb-5">
                {
                  recipeData.ingredientLines.map((item,index)=>{
                    return (
                      <li>{item}</li>
                    )
                  })
                }
              </ul>
              <a href={recipeData.url} target="_blank" className="bg-[#1f1f1f] text-[#73c140] px-4 py-2">View Recipe</a>
            </div>
          </>
        ) : (
          <p>Recipe not found</p>
        )}
    </div>
    <Footer/>
    </>
  )
}

export default SingleRecipe
