import { useState } from "react"
import "./App.css"
import Note from "./components/note"

function App() {
    const [highestZIndex, setHighestZIndex] = useState(0);
    const [notes, setNotes] = useState([])
    function addNote() {
        setNotes([
            ...notes,
            {
                id: Date.now(),
            },
        ])
    }

    function removeNote(noteId) {
        setNotes(notes.filter((item) => item.id !== noteId))
    }

    return (
        <div className="App ">
            <button className="z-[1000] sticky-btn p-5 bg-black text-white rounded-xl  absolute top-5 left-5 hover:bg-slate-400" onClick={addNote}>
                +
            </button>
            {notes.map((item) => (
                <Note  
                key={item.id} 
                highestZIndex={highestZIndex} 
                setHighestZIndex={setHighestZIndex} 
                onClose={() => removeNote(item.id)}/>
            ))}
        </div>
    )
}

export default App