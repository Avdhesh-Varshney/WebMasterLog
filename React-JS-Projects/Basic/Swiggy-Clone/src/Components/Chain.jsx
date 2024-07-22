import React from "react";

const items = [
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/44342bd7e177ae078781ba809f2af38c",
    offer: "FLAT 20% OFF",
    title: "WOW MOMO",
    ratingTiming: "4.4 :45-50 mins",
    cuisine: "Asian, Indian",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ioqg6ynikepkzqcq5gue",
    offer: "FLAT 15% OFF",
    title: "BURGER KING",
    ratingTiming: "4.3 :35-40 mins",
    cuisine: "American, Fast Food",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/5727d32443b403d22b4869346d74193f",
    offer: "BUY 1 GET 1 FREE",
    title: "PIZZA HUT",
    ratingTiming: "4.5 :30-35 mins",
    cuisine: "Italian, Pizza",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/46c6442ca72c545693cc2e0fcfa1aa0b",
    offer: "FLAT 25% OFF",
    title: "KFC",
    ratingTiming: "4.2 :25-30 mins",
    cuisine: "American, Fast Food",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/fe11ced6-89a3-4080-8610-3c743a3bb3f0_43836.jpg",
    offer: "FLAT 30% OFF",
    title: "SUBWAY",
    ratingTiming: "4.1 :20-25 mins",
    cuisine: "Healthy, Fast Food",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/917f828567b485833c8bc6a1ed3cb2ad",
    offer: "FREE DELIVERY",
    title: "MCDONALD'S",
    ratingTiming: "4.0 :15-20 mins",
    cuisine: "American, Fast Food",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/h6hb6b7acapwqzejkkro",
    offer: "FLAT 10% OFF",
    title: "DOMINOS",
    ratingTiming: "4.6 :30-35 mins",
    cuisine: "Italian, Pizza",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/22/a0ec7e7d-4bf6-40dc-9201-171cc04650d3_853146.jpg",
    offer: "20% CASHBACK",
    title: "TACO BELL",
    ratingTiming: "4.3 :25-30 mins",
    cuisine: "Mexican, Fast Food",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/hqtrdytdqec0ih3pfy5u",
    offer: "FLAT 50% OFF",
    title: "CHICKEN SHACK",
    ratingTiming: "4.7 :45-50 mins",
    cuisine: "American, Fast Food",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/64fd45fd9f44c1737bc446e470bed66",
    offer: "FLAT 20% OFF",
    title: "PAPA JOHN'S",
    ratingTiming: "4.4 :35-40 mins",
    cuisine: "Italian, Pizza",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/22/a0ec7e7d-4bf6-40dc-9201-171cc04650d3_853146.jpg",
    offer: "FLAT 15% OFF",
    title: "STARBUCKS",
    ratingTiming: "4.8 :10-15 mins",
    cuisine: "Cafe, Beverages",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/e0vvulfbahjxjz6k4uwi",
    offer: "BUY 1 GET 1 FREE",
    title: "DUNKIN DONUTS",
    ratingTiming: "4.1 :20-25 mins",
    cuisine: "Desserts, Cafe",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/5db28ee7aed5c06a08111207a24c6a2c",
    offer: "FLAT 25% OFF",
    title: "BASKIN ROBBINS",
    ratingTiming: "4.3 :15-20 mins",
    cuisine: "Desserts, Ice Cream",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/22/a0ec7e7d-4bf6-40dc-9201-171cc04650d3_853146.jpg",
    offer: "FLAT 30% OFF",
    title: "COSTA COFFEE",
    ratingTiming: "4.2 :20-25 mins",
    cuisine: "Cafe, Beverages",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/a33e4b8f95de51a4bf5639b226e69ca2",
    offer: "FREE DELIVERY",
    title: "HARD ROCK CAFE",
    ratingTiming: "4.5 :30-35 mins",
    cuisine: "American, Fast Food",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/7eb4741b9a035ea6e2bcca5c206b40cc",
    offer: "FLAT 10% OFF",
    title: "OLIVE GARDEN",
    ratingTiming: "4.4 :25-30 mins",
    cuisine: "Italian, Mediterranean",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/kj9ho53v6uomlznstevv",
    offer: "20% CASHBACK",
    title: "APPLEBEE'S",
    ratingTiming: "4.3 :30-35 mins",
    cuisine: "American, Fast Food",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/bdie0dbppeas6jfd8mek",
    offer: "FLAT 50% OFF",
    title: "IHOP",
    ratingTiming: "4.1 :35-40 mins",
    cuisine: "American, Breakfast",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/6e44fd7f1e5cd9967edfe47c10247671",
    offer: "FLAT 20% OFF",
    title: "CHILI'S",
    ratingTiming: "4.7 :40-45 mins",
    cuisine: "Mexican, American",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/dzfnv4xnrfnchnmnffyd",
    offer: "FLAT 15% OFF",
    title: "RED LOBSTER",
    ratingTiming: "4.5 :20-25 mins",
    cuisine: "Seafood, American",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/9e12e438906200daa8f401195ee43115",
    offer: "BUY 1 GET 1 FREE",
    title: "THE CHEESECAKE FACTORY",
    ratingTiming: "4.2 :30-35 mins",
    cuisine: "Desserts, American",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/9668a5819fcba35364dcff30d5f5cfbb",
    offer: "FLAT 25% OFF",
    title: "PANERA BREAD",
    ratingTiming: "4.6 :20-25 mins",
    cuisine: "Cafe, Healthy",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/76d5f4055f9d5796bc7b72dfba8bd92b",
    offer: "FLAT 30% OFF",
    title: "PEET'S COFFEE",
    ratingTiming: "4.4 :10-15 mins",
    cuisine: "Cafe, Beverages",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/19/741d7d41-1341-4358-b6e0-cc22b8e82f9a_750396.JPG",
    offer: "FREE DELIVERY",
    title: "SHAKE SHACK",
    ratingTiming: "4.3 :20-25 mins",
    cuisine: "American, Fast Food",
  },
];
const filters = [
  "Filter",
  "Sort By",
  "Fast Delivery",
  "New on Swiggy",
  "Ratings 4.0+",
  "Pure Veg",
  "Offers",
  "Rs. 300-Rs. 600",
  "Less than Rs. 300",
];

function Chain() {
  return (
    <div className="mt-[60px] w-[80vw] h-auto mx-auto mb-5">
      <p className="font-extrabold text-[20px] font-poppins mb-5">
        Top restaurant chains in Bangalore
      </p>
      <div className="flex mx-auto w-[80vw]  mb-6 justify-center gap-4 flex-wrap">
        {filters.map((_, ind) => (
          <button className="  border-gray-300 border-[1px] px-4 rounded-xl font-[900] font-poppins text-[13px] py-2 hover:border-black">
            {_}
          </button>
        ))}
      </div>
      <div className="flex  w-[80vw] h-auto mx-auto  gap-2 flex-wrap justify-center items-center">
        {items.map((_, ind) => (
          <div
            key={ind}
            className="h-[310px] transform transition-transform duration-300 hover:scale-95"
          >
            <div className="w-[16rem] h-[12rem] relative mr-2  ">
              <img
                className="w-full h-full object-cover rounded-lg "
                src={_.src}
                alt=""
              />
              <div className=" back absolute bottom-0 w-full rounded-lg ">
                <p className=" font-black font-poppins text-[18px] text-white  p-2 z-[1] ">
                  {_.offer}
                </p>
              </div>
              <div className="mt-2 pl-2  ">
                <p className=" font-black font-poppins text-[1rem]   z-[1] ">
                  {_.title}
                </p>
                <p className=" font-black font-poppins text-[1rem]   z-[1] ">
                  {_.ratingTiming}
                </p>
                <p className=" font-[400] font-poppins text-[1rem]  z-[1] ">
                  {_.cuisine}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chain;
