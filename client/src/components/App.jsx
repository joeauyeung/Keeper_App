import React, {useEffect, useState} from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
    const [notes, setNotes] = useState([])


    useEffect(() => {
        axios.get('http://localhost:8080/api')
        .then(response => {
            console.log(response.data)
            setNotes(response.data)})
    }, [])

    function addNote(newNote) {
        axios.post('http://localhost:8080/api', newNote)
        setNotes(prevNote =>{ return {...prevNote, newNote}})
    }

    function deleteNote(id) {
        axios.post('http://localhost:8080/api/delete', {id: id})
        setNotes(prevNotes => {
            reutrn prevNotes.filter(
                (item) => {
                    return item.id !== id
                }
            )
        })
    }

    return ( <div >
        <Header /> 
        <CreateArea onAdd={addNote}/>
        {notes.map((note) => <Note 
                key = {note._id}
                id = {note._id}
                title = {
                    note.title
                }
                content = {
                    note.content
                }
                onDelete={deleteNote}
                />
            )
        } 
        <Footer />
        </div>
    )
}

export default App;