import React from "react";

interface StampsProps {
  color: string;
}

const Stamps: React.FC<StampsProps> = ({ color }) => {
  return (
    <div className="w-full bg-[#23252c] mb-4 p-4 rounded-md flex justify-evenly items-center text-[18px] sm:text-[21px] font-medium">
      <p>14/06/2024</p>
      <p>20:40:01</p>
      <p className="flex gap-2 items-center">
        <span>Present</span>
        <span
          style={{ backgroundColor: color }}
          className="rounded-full w-[15px] h-[15px]"
        ></span>
      </p>
    </div>
  );
};

export default Stamps;
