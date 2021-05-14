const NoteItem = ({ note }) => <li>{note.content}</li>

const NoteList = ({ notes }) => (
  <ul>
    {notes.map((note) => (
      <NoteItem key={note.id} note={note} />
    ))}
  </ul>
)

export default NoteList
