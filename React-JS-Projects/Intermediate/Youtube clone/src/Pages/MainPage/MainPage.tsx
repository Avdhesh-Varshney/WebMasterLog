import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./MainPage.css";
import { ToggleSidebarContext } from "../../Helpers/Context";

const MainPage: React.FC = () => {
  const { showSidebar, setShowSidebar } = useContext(ToggleSidebarContext);

  return (
    <div className="MainPage">
      <div className="center">
        {showSidebar && <Sidebar />}

        <div className="VideoView"></div>
      </div>
    </div>
  );
};

export default MainPage;
