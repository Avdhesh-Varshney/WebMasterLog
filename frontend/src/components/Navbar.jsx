import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    return (
        <nav className="z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-white">
            <Link to="/" className="flex-none w-10">
                <img src="logo.png" alt="" className="w-full" />
            </Link>
            <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:opacity-100 md:pointer-events-auto " + (searchBoxVisibility ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none duration-100")}>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                />
                <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
            </div>

            <div className="flex items-center gap-3 md:gap-6 ml-auto">
                <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}>
                    <i className="fi fi-rr-search text-xl"></i>
                </button>

                <Link to="/editor" className="hidden md:flex gap-2 text-dark-grey hover:text-black hover:bg-grey p-3 px-4 opacity-75">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </Link>

                <Link className="btn-dark py-2" to="/api/signin">
                    Sign In
                </Link>
                <Link className="btn-light py-2 hidden md:block" to="/api/signup">
                    Sign Up
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;
