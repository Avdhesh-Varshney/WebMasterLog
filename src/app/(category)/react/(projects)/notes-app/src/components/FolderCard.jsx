import { useContext, useState } from "react";
import { FaFolder, FaPen, FaTrash } from "react-icons/fa";
import { FolderContext } from "../contexts/FolderContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

function FolderCard({ folder, setModalToggle, setEditedFolder }) {

    const { deleteFolder } = useContext(FolderContext);
    const [confirmToggle, setConfirmToggle] = useState(false)
    const navigate = useNavigate()

    const onConfirm = () => {
        deleteFolder(folder.user, folder.parent_folder, folder.id)
    }

    const toggle = () => {
        setConfirmToggle(prev => !prev)
    }

    const onEdit = async () => {
        setModalToggle("edit", true)
        setEditedFolder(folder)
    }

    return (
        <div 
            className="masonry-item bg-pink-900 text-white rounded cursor-pointer hover:bg-pink-800 flex flex-col"
        >
            <div className="flex items-center p-2 border-b border-pink-950">
                <div className="flex-1 text-sm font-medium capitalize">{folder?.name}</div>
                <FaPen
                    className="text-pink-50 h-7 w-7 p-2 ml-2 rounded bg-blue-600 cursor-pointer hover:bg-blue-700"
                    title="Edit List"
                    onClick={onEdit}
                />
                <FaTrash
                    className="text-pink-50 h-7 w-7 p-2 ml-2 rounded bg-red-600 cursor-pointer hover:bg-red-700"
                    title="Delete List"
                    onClick={toggle}
                />
            </div>
            <div className="p-2 grid place-items-center text-pink-500" onClick={() => navigate(`/${folder.id}`)}>
                <FaFolder className="text-5xl md:text-8xl"/>
            </div>

            {
                confirmToggle && (
                    <ConfirmModal
                        title="Confirm Delete"
                        body={`Are you sure, Do you want to delete folder "${folder?.name}"? This action cannot be undone.`}
                        onCancel={toggle}
                        onConfirm={onConfirm}
                    />
                )
            }
        </div>
    )
}

export default FolderCard;