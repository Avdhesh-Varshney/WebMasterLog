import { useContext, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { NoteContext } from "../contexts/NoteContext";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

function NoteCard({ note }) {

    const { loading, deleteNote } = useContext(NoteContext)
    const navigate = useNavigate();
    const [confirmToggle, setConfirmToggle] = useState(false)

    const onConfirm = () => {
        deleteNote(note.user, note.folder, note.id)
    }

    const toggle = () => {
        setConfirmToggle(prev => !prev)
    }

    const onEdit = async () => {
        navigate(`/editnote/${note.id}`)
    }

    return (
        <div className="masonry-item bg-pink-900 text-white rounded cursor-pointer hover:bg-pink-800 flex flex-col">
            <div className="flex items-center p-2 border-b border-pink-950">
                <div className="flex-1 text-sm font-medium capitalize">{note.title}</div>
                <FaPen
                    className="text-pink-50 h-7 w-7 p-2 ml-2 rounded bg-blue-600 cursor-pointer hover:bg-blue-700"
                    title="Edit note"
                    onClick={onEdit}
                />
                <FaTrash
                    className="text-pink-50 h-7 w-7 p-2 ml-2 rounded bg-red-600 cursor-pointer hover:bg-red-700"
                    title="Delete note"
                    onClick={toggle}
                />
            </div>
            <p
                className="p-3 text-gray-300 text-sm flex-1"
            >
                {truncateText(stripHtml(note.description), 75)}
                <span className="text-pink-500 hover:underline">
                    {note?.description.length !== 0 && <Link to={`/note/${note.id}`}> ... Read more</Link>}
                </span>
            </p>
            <div className="text-gray-400 px-3 pb-3 text-xs">{formatDate(note.createdAt.seconds)}</div>

            {
                confirmToggle && (
                    <ConfirmModal
                        title="Confirm Delete"
                        body={`Are you sure, Do you want to delete note "${note.title}"? This action cannot be undone.`}
                        onCancel={toggle}
                        onConfirm={onConfirm}
                    />
                )
            }
        </div>
    )
}

export default NoteCard;

function formatDate(timestampSeconds) {
    const timestampMilliseconds = timestampSeconds * 1000;

    const date = new Date(timestampMilliseconds);

    const day = date.getDate();
    const monthName = date.toLocaleString('default', { month: 'short' });

    const year = date.getFullYear();

    const formattedDate = `${day} ${monthName} ${year}`;

    return formattedDate

}

function stripHtml(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

function truncateText(text, limit) {
    if (text.length > limit) {
        return text.substring(0, limit);
    }
    return text;
}