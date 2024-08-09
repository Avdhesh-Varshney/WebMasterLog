"use client";
import { useState, useEffect } from "react";
import React from "react";
import "./percentages.css";
import EditModal from "./EditModal";

interface SubCardProps {
  Sub_name: string;
  attended: number;
  total: number;
  target_percentage: number;
  markPresent: () => void;
  markAbsent: () => void;
  changeName: (newName: string) => void;
  setPresent: (present: number) => void;
  setTotal: (total: number) => void;
  deleteSubject: () => void;
}
interface CustomStyle extends React.CSSProperties {
  "--bg-color"?: string;
  "--circle-percentage"?: string;
}

const SubCard: React.FC<SubCardProps> = ({
  attended,
  total,
  Sub_name,
  target_percentage,
  markPresent,
  markAbsent,
  changeName,
  setTotal,
  setPresent,
  deleteSubject,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  let percentage =
    total > 0 ? Number(((attended / total) * 100).toFixed(1)) : 100;
  let Status =
    target_percentage == percentage
      ? "On the Edge!"
      : target_percentage > percentage
      ? "Low Attendance!!"
      : "On track";
  let card_color =
    target_percentage == percentage
      ? "#006D90"
      : target_percentage > percentage
      ? "#892B2B"
      : "#1A5F18";
  let degs = (percentage / 100) * 360;
  const customStyle: CustomStyle = {
    "--bg-color": card_color,
    "--circle-percentage": `${degs}deg`,
  };

  const editModal = () => {
    setIsOpen(true);
  };

  return (
    <div
      style={{ backgroundColor: card_color }}
      className={`relative text-white p-4 rounded-lg w-[100%] sm:w-[450px] h-[140px] flex items-center justify-between space-x-4`}
    >
      <button
        className="text-white absolute top-0 right-2 text-[16px] cursor-pointer"
        onClick={deleteSubject}
      >
        x
      </button>
      <EditModal
        isOpen={isOpen}
        setOpen={setIsOpen}
        subject={{
          attended,
          total,
          Sub_name,
          setPresent,
          setTotal,
          changeName,
        }}
      />

      <div>
        <div className="flex items-center space-x-2">
          <div className="w-1 h-6 bg-green-500"></div>
          <h2 className="text-lg font-semibold">{Sub_name}</h2>
        </div>
        <div className="mt-2">
          <p className="text-lg sm:text-xl font-semibold sm:font-bold">
            Attendance{" "}
            <span className="text-3xl">
              {attended}/{total}
            </span>
          </p>
          <p className="text-sm">Status: {Status}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div
          style={customStyle}
          className="circular-progress relative h-[75px] w-[75px]"
        >
          {/* <div className="w-16 h-16 rounded-full border-4 border-teal-500 flex items-center justify-center p-8">
            <span className="text-lg font-semibold">100.0%</span>
          </div> */}
          <p className="absolute top-[27px] left-0 w-full text-center font-bold">
            {percentage}%
          </p>
        </div>
        <div className="flex gap-3">
          <button className="text-[19px]" onClick={markPresent}>
            ✅
          </button>
          <button className="" onClick={markAbsent}>
            <svg
              className="w-6 h-6"
              viewBox="0 0 40 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.166016"
                y="0.231445"
                width="39.5605"
                height="36.8799"
                rx="8"
                fill="#CF0000"
              />
              <path
                d="M14.3579 7.19908L19.9067 16.6682L25.4554 7.19908H29.5567L22.0779 18.7791L29.5567 30.3591H25.4554L19.9067 21.3725L14.3579 30.3591H10.2566L17.6148 18.7791L10.2566 7.19908H14.3579Z"
                fill="white"
              />
            </svg>
          </button>
          <button className="" onClick={editModal}>
            <svg
              className="w-6 h-6"
              viewBox="0 0 40 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.431641"
                y="0.231445"
                width="39.5605"
                height="36.8799"
                rx="8"
                fill="#0093E5"
              />
              <path
                d="M8.96191 25.2339V29.9214H13.6494L27.4744 16.0964L22.7869 11.4089L8.96191 25.2339ZM31.0994 12.4714C31.2153 12.3557 31.3072 12.2184 31.37 12.0672C31.4327 11.916 31.465 11.7539 31.465 11.5901C31.465 11.4264 31.4327 11.2643 31.37 11.1131C31.3072 10.9619 31.2153 10.8245 31.0994 10.7089L28.1744 7.78389C28.0588 7.66801 27.9214 7.57608 27.7702 7.51335C27.619 7.45062 27.4569 7.41833 27.2932 7.41833C27.1295 7.41833 26.9673 7.45062 26.8161 7.51335C26.6649 7.57608 26.5276 7.66801 26.4119 7.78389L24.1244 10.0714L28.8119 14.7589L31.0994 12.4714Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCard;
