import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { modules, formats } from "../../config/reactQuill";
import { useParams } from "react-router-dom";
import { NoteContext } from "../../contexts/NoteContext";
import Info from "../../components/Info";

function EditNote({ user }) {

    const {noteId } = useParams();
    const { note, loading, fetchNote, editNote } = useContext(NoteContext);
    const [inputs, setInputs] = useState({ noteTitle: "", folder: "", createdAt: "" })
    const [noteDescription, setDescription] = useState("");
    const [errors, setErrors] = useState({ noteTitle: "", description: "" })

    const onInputChange = (name, value) => {
        setErrors(prev => {
            return { ...prev, [name]: "" }
        })
        setInputs(prev => {
            return { ...prev, [name]: value }
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (inputs.noteTitle === "") {
            setErrors(prev => {
                return { ...prev, "noteTitle": "Note title is required!" }
            });
            return;
        }

        editNote(noteId, inputs.noteTitle, noteDescription, inputs.folder, user?.id, inputs.createdAt)

    };

    useEffect(() => {
        fetchNote(noteId)
    }, [])

    useEffect(() => {
        setInputs({ noteTitle: note?.noteTitle, folder: note?.folder, createdAt: note?.createdAt })
        setDescription(note?.description)
        console.log(note)
    }, [note])

    if (loading) return <Info message="Loading" />

    return (
        <div className="min-h-screen w-full px-4 md:px-8 flex flex-col items-center">
            <Header
                title="Edit note"
                setSearchToggle={null}
                back={note && note?.folder  ? `/${note.folder}` : `/`}
            />
            <form className="w-full sm:w-2/3 lg:w-2/3 p-3 text-white mt-3" onSubmit={onSubmit}>
                <Input
                    label="Title"
                    type="text"
                    placeholder="Title"
                    name="noteTitle"
                    value={inputs.noteTitle}
                    error={errors.noteTitle}
                    onChange={onInputChange}
                />
                <label
                        className="block mb-1 mt-5 text-sm"
                    >Note description</label>
                <div className="w-full p-1 bg-transparent rounded outline-none border-2 border-gray-300 focus:border-pink-500">
                    
                    <ReactQuill
                        value={noteDescription}
                        onChange={setDescription}
                        modules={modules}
                        formats={formats}
                        theme="bubble"
                    />
                </div>

                <Button
                    text="Save"
                    width="w-full"
                    bg="bg-pink-900"
                    hover="hover:bg-pink-800"
                    focus="focus:ring-pink-800"
                    color="text-white-700"
                    onClick={null}
                    loading={inputs.noteTitle!=="" && loading}
                />
            </form>
        </div>
    )


}

export default EditNote;