import { useState } from "react"
import { FaFolder, FaList, FaPlus, FaTimes } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom";

function NewActionButton({toggleNewFolder}) {

    const {folderId} = useParams();
    const navigate = useNavigate()
    const [menuToggle, setMenuToggle] = useState(false)

    const goToNewFolder = () => {
        if (folderId) {
            console.log("listed")
            navigate(`/newnote/${folderId}`)
        }else {
            console.log("unlisted")
            navigate(`/newnote`)
        }
    }

    return (
        <div
            className="fixed w-12 h-12 bottom-10 right-14 rounded-full cursor-pointer z-10 text-white grid place-items-center text-sm"
        >
            {
                menuToggle ? (
                    <FaTimes
                        className="h-full w-full bg-pink-500 p-4 rounded-full hover:bg-pink-600"
                        onClick={() => setMenuToggle(false)}
                    />
                ) : (
                    <FaPlus
                        className="h-full w-full bg-pink-500 p-4 rounded-full hover:bg-pink-600"
                        onClick={() => setMenuToggle(true)}
                    />
                )
            }
            {
                menuToggle && <ul
                    className="absolute list-none w-36 bottom-full right-6 mb-2 bg-pink-500"
                >
                    <li
                        onClick={() => toggleNewFolder("new", true)}
                        className="p-2 border-b border-pink-400 hover:bg-pink-600 flex items-center gap-3"
                    >
                        <FaFolder />New folder
                    </li>
                    <li
                        className="p-2 hover:bg-pink-600 flex items-center gap-3"
                        onClick={goToNewFolder}
                    >
                        <FaList /> New note
                    </li>
                </ul>
            }
        </div>
    )
}

export default NewActionButton