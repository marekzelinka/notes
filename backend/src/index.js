const express = require('express')

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0
  return maxId + 1
}

const app = express()

app.use(express.json())

app.get('/', (_req, res) => res.send('<h1>Hello world</h1>'))

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (body.content === undefined) {
    res.status(400).json({ error: 'content missing' })
    return
  }

  const note = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    important: body.important ?? false,
  }

  notes = notes.concat(note)

  res.json(note)
})

app.get('/api/notes', (_req, res) => res.json(notes))

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find((note) => note.id === Number(req.params.id))
  if (note === undefined) {
    res.status(404).end()
    return
  }

  res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter((note) => note.id !== Number(req.params.id))
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
