const NoteItem = ({ note, onToggle }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li>
      {note.content}
      <button onClick={() => onToggle(note.id)}>{label}</button>
    </li>
  )
}

export default NoteItem
