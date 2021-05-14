const { default: axios } = require('axios')

const baseUrl = 'http://localhost:3001/notes'

const noteService = {
  getAll: () => {
    const nonExisting = {
      id: 10000,
      content: 'This note is not saed to server',
      date: '2019-05-30T17:30:31.098Z',
      important: true,
    }
    return axios.get(baseUrl).then((res) => res.data.concat(nonExisting))
  },

  create: (newObj) => {
    return axios.post(baseUrl, newObj).then((res) => res.data)
  },

  update: (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj).then((res) => res.data)
  },
}

export default noteService
