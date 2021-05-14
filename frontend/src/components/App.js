import { useEffect, useState } from 'react'
import Filter from './Filter'
import NoteList from './NoteList'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import noteService from 'services/notes'
import Notification from './Notification'
import Footer from './Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes))
  }, [])

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const addNote = (newNote) => {
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObj)
      .then((returnedNote) => setNotes((notes) => notes.concat(returnedNote)))
  }

  const toggleImportance = (id) => {
    const note = notes.find((note) => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes((notes) =>
          notes.map((note) => (note.id !== id ? note : returnedNote))
        )
      )
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server'`
        )
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes((notes) => notes.filter((note) => note.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <Filter
        value={showAll}
        onClick={() => setShowAll((showAll) => !showAll)}
      />
      <NoteList
        notes={notesToShow}
        renderNote={(note) => (
          <NoteItem key={note.id} note={note} onToggle={toggleImportance} />
        )}
      />
      <AddNote onSubmit={addNote} />
      <Footer />
    </div>
  )
}

export default App
