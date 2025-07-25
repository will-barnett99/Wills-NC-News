
const express = require('express')
const app = express()
const port = 3000
const getTopics = require('./controllers/topics-controller')
const getArticles = require('./controllers/articles-controller')
const getUsers = require('./controllers/users-controller')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)


module.exports = app; 