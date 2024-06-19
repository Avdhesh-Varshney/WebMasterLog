import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db} from "../config/firebase";
import { useState } from "react";
import { FolderContext } from "../contexts/FolderContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UseFolder() {

    const [foldersList, setfoldersList] = useState(null)
    const [folderLoading, setLoading] = useState(false)
    const [folder, setfolder] = useState({foldername: "", createdAt: "" })
    const navigate = useNavigate();

    const fetchAllFolders = async (userId) => {
        if ((!userId)) {
            navigate("/login");return;
        }
        try {
            setLoading(true)
            const snapshot = await getDocs(
                query(
                    collection(db, "folders"),
                    where("user", "==", userId)
                )
            )
            const folders = [];
            snapshot.forEach((doc) => {
                folders.push({ id: doc.id, ...doc.data() });
            });
            setfoldersList(folders)
        }catch (error) {
            toast.error("Unable to process your request now. Please try again later!")
        } finally {
            setLoading(false)
        }
    }

    const fetchFolderByFolder = async (userId, folderId) => {
        if ((!userId)) {
            navigate("/login");
            return;
        }
        try {
            setLoading(true)
            const snapshot = await getDocs(
                query(
                    collection(db, "folders"),
                    where("user", "==", userId),
                    where("parent_folder", "==", folderId)
                )
            )
            const folders = [];
            snapshot.forEach((doc) => {
                folders.push({ id: doc.id, ...doc.data() });
            });
            setfoldersList(folders)
        }catch (error) {
            // toast.error("Unable to process your request now. Please try again later!")
        } finally {
            setLoading(false)
        }
    }

    const fetchFolder = async (folderId) => {
        if ((!folderId)) {
            navigate("/login")
            return;
        }
        try {
            setLoading(true)
            const snapshot = await getDoc(doc(db, "folders", folderId))
            if (snapshot.exists()) {
                setfolder({ 
                    foldername: snapshot.data().name, 
                    parent: snapshot.data().parent_folder,
                    createdAt: snapshot.data().createdAt
                })
            }else {
                window.location.href = "/dashboard"
            }
        }catch (error) {
            console.log(error)
            toast.error("Unable to process your request now. Please try again later!")
        } finally {
            setLoading(false)
        }
    }

    const saveFolder = async (name, parentFolderId, userId) => {
        if ((!userId)) {
            navigate("/login");return;
        }
        try {
            setLoading(true);
            await addDoc(collection(db, "folders"), {
                name: name,
                parent_folder: parentFolderId,
                user: userId,
                createdAt: new Date()
            });
            fetchFolderByFolder(userId, parentFolderId)
            console.log("added")
        } catch (error) {
            console.log(error);
            toast.error("Unable to process your request now. Please try again later!");
        } finally {
            setLoading(false);
        }
    }

    const editFolder = async (folderId, name, parentFolderId, userId, createdAt) => {
        if ((!userId)) {
            navigate("/login");return;
        }
        try {
            setLoading(true);
            await setDoc(doc(db, "folders", folderId), {
                name: name,
                user: userId,
                parent_folder: parentFolderId,
                createdAt: createdAt,
                updatedAt: new Date()
            });
            console.log("edited");
            fetchFolderByFolder(userId, parentFolderId)
            // setfolder(null)
        } catch (error) {
            console.log(error);
            toast.error("Unable to process your request now. Please try again later!");
        } finally {
            setLoading(false);
        }
    }

    const deleteFolder = async (user, parent_folder, folderId) => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, "folders", folderId))
            fetchFolderByFolder(user, parent_folder)
        }catch (error) {
            console.log(error);
            toast.error("Unable to process your request now. Please try again later!");
        }
    }

    return {
        foldersList, folder, folderLoading, fetchAllFolders, fetchFolderByFolder, fetchFolder, saveFolder, editFolder, deleteFolder
    }


}

function FoldersWrapper({children}) {
    const { foldersList, folder, folderLoading, fetchAllFolders, fetchFolderByFolder, fetchFolder, saveFolder, editFolder, deleteFolder } = UseFolder()

    return (
        <FolderContext.Provider
            value={{
                foldersList, folder, folderLoading, fetchAllFolders, fetchFolderByFolder, fetchFolder, saveFolder, editFolder, deleteFolder
            }}
        >
            {children}
        </FolderContext.Provider>
    )
}

export default FoldersWrapper;
