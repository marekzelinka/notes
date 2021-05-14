import { useState } from 'react'
import NoteList from './NoteList'

const App = ({ notes: initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const addNote = (e) => {
    e.preventDefault()

    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes((notes) => notes.concat(noteObj))
    setNewNote('')
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll((showAll) => !showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <NoteList notes={notesToShow} />
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
