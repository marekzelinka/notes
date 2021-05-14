import NoteList from './NoteList'

const App = ({ notes }) => (
  <div>
    <h1>Notes</h1>
    <NoteList notes={notes} />
  </div>
)

export default App
