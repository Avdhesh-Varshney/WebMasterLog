import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

function Search({ setSearchToggle, OnSearchValueChange }) {

    const searchInput = useRef()

    useEffect(() => {
        searchInput.current.focus()
    }, [])
    return (
        <div className="w-full my-2 flex">
            <input
                type="text"
                ref={searchInput}
                placeholder="Search"
                className="flex-1 outline-none text-pink-50 bg-transparent px-3 border-2 border-pink-900 rounded-l h-12"
                onChange={OnSearchValueChange}
            />
            <FaTimes
                className="h-12 w-12 p-4 text-pink-50  bg-pink-900 cursor-pointer hover:bg-pink-800 rounded-r"
                onClick={setSearchToggle}
            />
        </div>
    )
}

export default Search;