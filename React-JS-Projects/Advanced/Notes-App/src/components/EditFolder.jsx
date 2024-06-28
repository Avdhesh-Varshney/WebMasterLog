import { useState, useContext } from "react";
import Input from "./Input";
import Button from "./Button";
import { FaTimes } from "react-icons/fa";
import { FolderContext } from "../contexts/FolderContext";
import { useParams } from "react-router-dom";


function EditFolder({setModalToggle, folder}) {

    const { folderId } = useParams()
    const [inputs, setInputs] = useState({ folderName: folder.name, createdAt: folder.createdAt })
    const [error, setError] = useState("")
    const { editFolder } = useContext(FolderContext);

    const onInputChange = (name, value) => {
        setError("")
        setInputs(prev => {
            return { ...prev, [name]: value }
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (inputs.folderName === "") {
            setError("Folder name is required!");
            return;
        }
        if (folderId) {
            await editFolder(folder.id, inputs.folderName, folderId, folder.user, inputs.createdAt)
        }else {
            await editFolder(folder.id, inputs.folderName, null, folder.user, inputs.createdAt)
        }
        setModalToggle("edit", false)
    };

    return (
        <section className="grid place-items-center w-100 min-h-screen p-4 fixed top-0 left-0 bg-blur w-full z-20">
            <form className="w-full sm:w-2/3 lg:w-1/3 bg-pink-900 p-3 text-white" onSubmit={onSubmit}>
                <h1 className="text-xl mt-1 mb-3 font-medium flex items-center">
                    <span className="flex-1">Edit Folder</span>
                    <span 
                        className="hover:text-pink-400 cursor-pointer"
                        onClick={() => setModalToggle("edit", false)}
                    ><FaTimes/></span>
                </h1>
                <Input
                    label="Folder name"
                    type="text"
                    placeholder="Eg., Work"
                    name="folderName"
                    value={inputs.folderName}
                    error={error}
                    onChange={onInputChange}
                />

                <Button
                    text="Save"
                    width="w-full"
                    bg="bg-pink-500"
                    hover="hover:bg-pink-600"
                    focus="focus:ring-pink-800"
                    color="text-white-700"
                    onClick={null}
                    loading={false}
                />


                
            </form>
        </section>
    )

}

export default EditFolder;