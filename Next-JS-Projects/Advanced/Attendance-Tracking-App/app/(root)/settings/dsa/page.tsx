import Stamps from "@/Components/Settings/Stamps";
import React from "react";

const page = () => {
  return (
    <div className="w-full page-height-class flex flex-col items-center p-4">
      {/* <div className="bg-red-700 w-[100px] h-[100px] rounded-full"></div> */}

      <div className="w-[95%] sm:w-[80%] max-w-[1000px] ">
        <div className="flex items-center justify-between w-full mb-6">
          <h1 className="font-semibold text-[21px]">DSA Report</h1>

          <a
            href="/dashboard/settings"
            className="p-2 bg-[#23252c] hover:bg-[#2e49dd] rounded-full"
          >
            {" "}
            <svg
              className="w-6 h-6"
              viewBox="0 0 38 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.521549 12.972C-0.186031 13.6796 -0.186031 14.8268 0.521549 15.5344L12.0522 27.065C12.7598 27.7726 13.907 27.7726 14.6146 27.065C15.3222 26.3575 15.3222 25.2102 14.6146 24.5027L4.3651 14.2532L14.6146 4.00369C15.3222 3.29611 15.3222 2.1489 14.6146 1.44132C13.907 0.733739 12.7598 0.733739 12.0522 1.44132L0.521549 12.972ZM37.3496 12.4413L1.80273 12.4413V16.065L37.3496 16.065V12.4413Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
        <div className="w-full bg-[#23252c] p-4 rounded-md flex justify-evenly items-center text-[18px] sm:text-[21px] font-medium mb-6">
          <p>Date</p>
          <p>Time</p>
          <p>Status</p>
        </div>
        <Stamps color="#00B012" />
        <Stamps color="#00B012" />
        <Stamps color="#B00000" />
        <Stamps color="#00B012" />
        <Stamps color="#00B012" />
        <Stamps color="#B00000" />
      </div>
    </div>
  );
};

export default page;
