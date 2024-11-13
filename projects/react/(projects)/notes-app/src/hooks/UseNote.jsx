import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db} from "../config/firebase";
import { useEffect, useState } from "react";
import { NoteContext } from "../contexts/NoteContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UseNote() {

    const [notesList, setNotesList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState({noteTitle: "", createdAt: "", description: "" })
    const navigate = useNavigate();

    const fetchAllNotes = async (userId) => {
        if ((!userId)) {
            navigate("/login");return;
        }
        try {
            setLoading(true)
            const snapshot = await getDocs(
                query(
                    collection(db, "notes"),
                    where("user", "==", userId)
                )
            )
            const notes = [];
            snapshot.forEach((doc) => {
                notes.push({ id: doc.id, ...doc.data() });
            });
            setNotesList(notes)
        }catch (error) {
            toast.error("Unable to process your request now. Please try again later!")
        } finally {
            setLoading(false)
        }
    }

    const fetchNotesByFolder = async (userId, folderId) => {
        if ((!userId)) {
            navigate("/login");
            return;
        }
        try {
            setLoading(true)
            const snapshot = await getDocs(
                query(
                    collection(db, "notes"),
                    where("user", "==", userId),
                    where("folder", "==", folderId)
                )
            )
            const notes = [];
            snapshot.forEach((doc) => {
                notes.push({ id: doc.id, ...doc.data() });
            });
            setNotesList(notes)
        }catch (error) {
            // toast.error("Unable to process your request now. Please try again later!")
        } finally {
            setLoading(false)
        }
    }

    const fetchNote = async (noteId) => {
        if ((!noteId)) {
            navigate("/login");return;
        }
        try {
            setLoading(true)
            const snapshot = await getDoc(doc(db, "notes", noteId))
            if (snapshot.exists()) {
                setNote({ 
                    noteTitle: snapshot.data().title, 
                    createdAt: snapshot.data().createdAt,
                    folder: snapshot.data().folder, 
                    description: snapshot.data().description 
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

    const saveNote = async (title, description, folderId, userId) => {
        if ((!userId)) {
            navigate("/login");return;
        }
        console.log(folderId)
        try {
            setLoading(true);
            await addDoc(collection(db, "notes"), {
                title: title,
                description: description,
                folder: folderId,
                user: userId,
                createdAt: new Date()
            });
            if (folderId) {
                navigate(`/${folderId}`)
            }else {
                navigate(`/`)
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to process your request now. Please try again later!");
        } finally {
            setLoading(false);
        }
    }

    const editNote = async (noteId, title, description, folderId, userId, createdAt) => {
        if ((!userId)) {
            navigate("/login");return;
        }
        try {
            setLoading(true);
            await setDoc(doc(db, "notes", noteId), {
                title: title,
                description: description,
                folder: folderId,
                user: userId,
                createdAt: createdAt,
                updatedAt: new Date()
            });
            console.log("edited");
            setNote(null)
            if (folderId) {
                navigate(`/${folderId}`)
            }else {
                navigate(`/`)
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to process your request now. Please try again later!");
        } finally {
            setLoading(false);
        }
    }

    const deleteNote = async (user, folder, noteId) => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, "notes", noteId))
            fetchNotesByFolder(user, folder)
        }catch (error) {
            console.log(error);
            toast.error("Unable to process your request now. Please try again later!");
        }
    }

    return {
        notesList, note, loading, fetchAllNotes, fetchNotesByFolder, fetchNote, saveNote, editNote, deleteNote
    }


}

function NotesWrapper({children}) {
    const { notesList, note, loading, fetchAllNotes, fetchNotesByFolder, fetchNote, saveNote, editNote, deleteNote } = UseNote()

    return (
        <NoteContext.Provider
            value={{
                notesList, note, loading, fetchAllNotes, fetchNotesByFolder, fetchNote, saveNote, editNote, deleteNote
            }}
        >
            {children}
        </NoteContext.Provider>
    )
}

export default NotesWrapper;
