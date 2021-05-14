const NoteList = ({ notes, renderNote }) => (
  <ul>{notes.map((note) => renderNote(note))}</ul>
)

export default NoteList
