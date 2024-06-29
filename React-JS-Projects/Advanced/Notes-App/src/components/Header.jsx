import { useContext } from "react";
import { FaArrowLeft, FaPlus, FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaFolderPlus } from "react-icons/fa6";

function Header({ title, setSearchToggle, back }) {
    
    const { currentUser, logout } = useContext(AuthContext)

    return (
        <div className="w-full pt-4 pb-2 bg-transparent border-b-2 border-gray-500 flex items-center">
            {
                title !== "NoteNova" &&
                <Link to={back}>
                    <FaArrowLeft
                        className="text-pink-50 h-8 w-8 p-2 mr-2 rounded cursor-pointer hover:bg-pink-800"
                        title="New note"
                    />
                </Link>
            }

            <h1
                className="text-pink-100 text-lg md:text-2xl md:font-bold text-left flex-1 capitalize"
            >
                {title}
            </h1>

            {
                setSearchToggle &&
                <FaSearch
                    className="text-pink-50 h-8 w-8 p-2 ml-2 rounded bg-pink-900 cursor-pointer hover:bg-pink-800"
                    title="Search notes"
                    onClick={setSearchToggle}
                />
            }

            <div
                className="flex items-center bg-pink-900 ml-2 rounded text-white cursor-pointer hover:bg-pink-800"
                title="Log out"
                onClick={logout}
            >
                <FaSignOutAlt className="text-pink-50 h-8 w-8 p-2" />
                <span className="pr-3 capitalize">{currentUser?.username || "Unknown"}</span>
            </div>

        </div>
    )
}

export default Header;