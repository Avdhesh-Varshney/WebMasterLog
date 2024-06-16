import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Search from "../../components/Search";
import NotesList from "../../components/NotesList";
import { AuthContext } from "../../contexts/AuthContext";
import Login from "../auth/Login";
import Info from "../../components/Info";
import FolderList from "../../components/FolderList";
import { NoteContext } from "../../contexts/NoteContext";
import { useParams } from "react-router-dom";
import { FolderContext } from "../../contexts/FolderContext";

function DashBoard() {

    // current folder id
    const { folderId } = useParams()

    // fetch folder information and inner folders related to folder id
    const { foldersList, folder, folderLoading, fetchFolderByFolder, fetchFolder } = useContext(FolderContext)

    // get current user
    const { currentUser, fetchingUser } = useContext(AuthContext)

    // fetch notes related to folder id
    const { loading, notesList, fetchNotesByFolder } = useContext(NoteContext)

    useEffect(() => {
        if (folderId) {
            fetchNotesByFolder(currentUser?.id, folderId)
            fetchFolder(folderId)
            fetchFolderByFolder(currentUser?.id, folderId)
        } else {
            fetchFolderByFolder(currentUser?.id, null)
            fetchNotesByFolder(currentUser?.id, null)
        }
    }, [folderId])

    // search stuff
    const [searchToggle, setSearchToggle] = useState(false)
    const [searchkey, setSearchKey] = useState("");
    const [searchedNotes, setSearchedNotes] = useState(notesList)
    const [searchedfolders, setSearchedfolders] = useState(foldersList)

    useEffect(() => {
        const f = foldersList?.filter(folder => folder.name.toLowerCase().includes(searchkey.toLowerCase()));
        const n = notesList?.filter(note => note.title.toLowerCase().includes(searchkey.toLowerCase()))
        setSearchedNotes(n)
        setSearchedfolders(f)
    }, [searchkey, foldersList, notesList])

    const onSearchToggle = () => {
        setSearchToggle(prev => !prev)
    }

    const OnSearchValueChange = (e) => {
        setSearchKey(e.target.value);
    }

    if (fetchingUser) return <Info message="Loading..." />;
    if (folderLoading || loading) return <Info message="Loading..." />
    if (!currentUser) return <Login />

    return (
        <div className="min-h-screen w-full px-4 md:px-8">
            <Header 
                title={folderId ? folder?.foldername : "NoteNova"} 
                setSearchToggle={onSearchToggle} 
                back={folderId && folder?.parent ? `/${folder?.parent}` : `/`}
            />
            {searchToggle && <Search setSearchToggle={onSearchToggle} OnSearchValueChange={OnSearchValueChange} />}

            {
                (foldersList?.length == 0 && notesList?.length == 0 ) ? (
                    <Info message="You have no folders or notes here!"/> 
                ) : (searchedNotes?.length == 0 && searchedfolders?.length == 0 ) ? (
                    <Info message={`No results found for "${searchkey}"!`}/> 
                ) : <></>
            }

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 py-5">
                <FolderList foldersList={searchedfolders} user={currentUser}/>
                <NotesList notesList={searchedNotes} />
            </div>

        </div>
    )

}

export default DashBoard;