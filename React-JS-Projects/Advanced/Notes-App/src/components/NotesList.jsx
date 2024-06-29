import NoteCard from "./NoteCard";

function NotesList({ notesList }) {

    return (

        <>

            {
                notesList?.map((note) => {
                    return <NoteCard note={note} key={note.id} />
                })
            }

        </>
    )

}

export default NotesList;