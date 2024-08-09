import React from "react";
import ActivityCard from "./ActivityCard";
const Settings = () => {
  return (
    <div className="flex flex-col items-center p-4 page-height-class relative ">
      <img
        src="/assets/images/profile.png"
        alt="profile"
        className="w-[200px] mb-2"
      />
      <p className="gradient-profile-text font-semibold text-[25px] mb-6">
        User Profile
      </p>
      <div className="bg-[#23252c] p-4 w-[90%] max-w-[1200px] h-full rounded-md relative mb-[40px]">
        <p className="text-xl font-semibold ml-2">Your Activity</p>
        <ActivityCard attended={3} total={4} sub_name="DSA" />
        <ActivityCard attended={6} total={10} sub_name="Compiler" />
        {/* <ActivityCard attended={7} total={8} sub_name="Algorithms" /> */}
        <ActivityCard attended={2} total={2} sub_name="Graphics" />

        <div className="underline text-[#0070B1] absolute bottom-[-35px] right-0">
          Log Out?
        </div>
      </div>
    </div>
  );
};

export default Settings;
