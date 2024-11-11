import React from "react";

interface ActivityCardProps {
  attended: number;
  total: number;
  sub_name: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  attended,
  total,
  sub_name,
}) => {
  return (
    <div className="p-2">
      <div className="w-full bg-[#171721] flex justify-between items-center p-2 pl-4 rounded-md">
        <div className="flex flex-col items-start">
          <div className="text-lg font-semibold ml-2 relative mb-1">
            {sub_name}
            <div className="bg-[#4BAB00] h-full w-[3px] absolute top-0 left-[-8px]"></div>
          </div>
          <div className="ml-2">
            Attendance {attended}/{total}
          </div>
        </div>
        <a href="./settings/dsa">
          <svg
            className="w-6 h-6"
            viewBox="0 0 40 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.429688"
              y="0.39917"
              width="39.5605"
              height="36.8799"
              rx="8"
              fill="#0093E5"
            />
            <path
              d="M20.2109 11.1251C12.6649 11.1251 6.71094 18.8391 6.71094 18.8391C6.71094 18.8391 12.6649 26.5541 20.2109 26.5541C25.9809 26.5541 33.7109 18.8391 33.7109 18.8391C33.7109 18.8391 25.9809 11.1251 20.2109 11.1251ZM20.2109 23.6451C17.5609 23.6451 15.4039 21.4891 15.4039 18.8391C15.4039 16.1891 17.5609 14.0321 20.2109 14.0321C22.8609 14.0321 25.0179 16.1891 25.0179 18.8391C25.0179 21.4891 22.8609 23.6451 20.2109 23.6451ZM20.2109 16.0331C19.8381 16.0261 19.4675 16.0934 19.121 16.2313C18.7744 16.3691 18.4588 16.5746 18.1926 16.8358C17.9265 17.0971 17.715 17.4087 17.5707 17.7526C17.4263 18.0965 17.352 18.4657 17.352 18.8386C17.352 19.2116 17.4263 19.5808 17.5707 19.9247C17.715 20.2685 17.9265 20.5802 18.1926 20.8414C18.4588 21.1026 18.7744 21.3081 19.121 21.446C19.4675 21.5838 19.8381 21.6512 20.2109 21.6441C20.9458 21.6302 21.6459 21.3286 22.1607 20.8039C22.6756 20.2793 22.964 19.5736 22.964 18.8386C22.964 18.1036 22.6756 17.3979 22.1607 16.8733C21.6459 16.3487 20.9458 16.047 20.2109 16.0331Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ActivityCard;
