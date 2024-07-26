import React from "react";

function Playstore() {
  return (
    <div className="flex w-full h-auto justify-evenly items-center bg-slate-200 py-5 ">
      <div className="w-[30vw] ">
        <h1 className="font-poppins font-black text-[20px] max-md:text-[10px]">
          For better experience,download the Swiggy app now
        </h1>
      </div>
      <div className=" flex gap-2">
        <div className="w-[10.5rem] max-md:w-[6.5rem]">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
            alt=""
            className="w-full"
          />
        </div>
        <div className="w-[10rem] max-md:w-[6rem]">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
            alt=""
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Playstore;
//  Madhavan112 original work
