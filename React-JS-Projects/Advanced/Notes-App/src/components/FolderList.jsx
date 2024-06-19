import { useState } from "react";
import FolderCard from "./FolderCard";
import NewFolder from "./NewFolder";
import EditFolder from "./EditFolder";
import NewActionButton from "./NewActionButton";

function FolderList({ foldersList, user }) {

    const [modalToggle, setModalToggle] = useState({ new: false, edit: false })
    const [ editedFolder, setEditedFolder] = useState(null)

    const onModalToggle = (type, toggle) => {
        setModalToggle(prev => {
            return { ...prev, [type]: toggle }
        });
    }

    return (

        <>

            {
                foldersList?.map((folder) => {
                    return <FolderCard folder={folder} key={folder.id} setModalToggle={onModalToggle} setEditedFolder={setEditedFolder}/>
                })
            }



            {modalToggle.new && <NewFolder setModalToggle={onModalToggle} user={user} />}
            {modalToggle.edit && <EditFolder setModalToggle={onModalToggle} folder={editedFolder}/>}
            
            <NewActionButton toggleNewFolder={onModalToggle}/>


        </>

    )

}

export default FolderList;