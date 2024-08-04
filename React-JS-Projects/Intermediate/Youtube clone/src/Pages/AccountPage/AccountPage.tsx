import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./AccountPage.css";

const AccountPage: React.FC = () => {
  const [profileInfo, setProfileInfo] = useState<any>({
    channelName: "",
    profilePicture: "",
    email: "",
    createdAt: "",
  });

  useEffect(() => {
    const id = sessionStorage.getItem("googleId");
    Axios.get(`http://localhost:3001/user/${id}`).then((response) => {
      console.log(response);
      setProfileInfo({
        channelName: response.data[0].channelName,
        profilePicture: response.data[0].profilePictureUrl,
        email: response.data[0].email,
        createdAt: response.data[0].createdAt,
      });
    });
  }, []);
  return (
    <div className="AccountPage">
      <div className="Container">
        <div className="TitleContainer">
          <h1>Channel Details</h1>
          <hr />
        </div>
        <div className="BodyContainer">
          <h1>{profileInfo.channelName} </h1>
          <img src={profileInfo.profilePicture} />
          <h3>{profileInfo.email}</h3>
          <hr />
          <h4> Channel Birthdate: {profileInfo.createdAt}</h4>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
