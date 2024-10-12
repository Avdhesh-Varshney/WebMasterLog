import { Outlet } from "react-router-dom";
import CustomNavbar from "./Navbar"; 

export default function Layout() {
  return (
    <div>
      <CustomNavbar />
      <div className=" pt-20"> {/* Increased top padding to account for navbar */}
        <Outlet /> 
      </div>
    </div>
  );
}