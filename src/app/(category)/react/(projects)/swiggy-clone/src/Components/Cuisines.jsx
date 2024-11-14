import React from 'react'
const cuisine = [
  "Chinese Restaurant Near Me",
  "Italian Restaurant Near Me",
  "Indian Restaurant Near Me",
  "Mexican Restaurant Near Me",
  "Thai Restaurant Near Me",
  "Japanese Restaurant Near Me",
  "French Restaurant Near Me",
  "Greek Restaurant Near Me",
  "North Indian Restaurant Near Me",
  "Seafood Restaurant Near Me",
  "Pizza Place Near Me",
  "Burger Joint Near Me",
  "Sushi Bar Near Me",
  "BBQ Restaurant Near Me",
  "Steakhouse Near Me",
  "Diner Near Me",
  "Breakfast Cafe Near Me",
  "Bakery Near Me",
  "Dessert Place Near Me",
  "Vegetarian Restaurant Near Me",
  "Show More >"
];
const review = ["Explore Restaurants Near Me","Explore Top Rated Restaurants Near Me"]


function Cuisines() {
  return (
    <div className='w-[80vw] mx-auto'>
      <h1 className="font-extrabold text-[20px] font-poppins ">Best Cuisines Near Me</h1>
      <div className="flex  w-[80vw] max-sm:w-full mb-6 py-4 gap-2 flex-wrap ">
        {cuisine.map((_, ind) => (
          <button className="  border-gray-300 border-[1px] px-4 basis-[30%] max-sm:text-[8px] max-sm:py-2 max-sm:basis-[31%] p-2 rounded-xl font-[900] font-poppins text-[12px] py-2 hover:border-black">
            {_}
          </button>
        ))}
     
      </div>
      <h1 className="font-extrabold text-[20px] font-poppins ">Explore Every Restaurants Near Me</h1>
      <div className="flex  w-[80vw] mx-auto mb-6 py-4 gap-2 flex-wrap ">
        {review.map((_, ind) => (
          <button className="  border-gray-300 border-[1px] px-4 basis-[45%] max-sm:text-[9px] max-sm:py-0  p-2 rounded-xl font-[900] font-poppins text-[12px] py-2 hover:border-black">
            {_}
          </button>
        ))}
     
      </div>
    </div>
  )
}

export default Cuisines