import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { NoteContext } from "../../contexts/NoteContext";
import Info from "../../components/Info";
import { useContext, useEffect } from "react";

function ViewNote() {

    const { noteId } = useParams();
    const { note, loading, fetchNote } = useContext(NoteContext);

    useEffect(() => {
        fetchNote(noteId)
    }, [])

    if (loading) return <Info message="Loading" />

    return (
        <div className="min-h-screen w-full px-4 md:px-8 flex flex-col items-center">
            <Header
                title={note?.noteTitle}
                back={note?.folder ? `/${note?.folder}` : `/`}
            />
            <div className="w-full sm:w-2/3 lg:w-2/3 p-3 text-white mt-3">
                <div 
                    className="mb-3 w-full"
                    dangerouslySetInnerHTML={{ __html: note?.description }}
                >
                </div>
            </div>
        </div>
    )
}

export default ViewNote;