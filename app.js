
const express = require('express')
const app = express()
const getTopics = require('./controllers/topics-controller')
const getArticles = require('./controllers/articles-controller')
const getUsers = require('./controllers/users-controller')
const getArticleById = require('./controllers/articleID-controller')
const getCommentsByArticleId = require('./controllers/comments-controller')
const cors = require('cors');

app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)


app.get('/api/users', getUsers)


app.use((req, res) => { 
res.status(404).send({msg: 'Path not found'})
})

app.use((err, req, res, next) => {
    if(err.code === "22P02") {
        res.status(400)
        res.send({msg: "Bad Request"})
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status)
        res.send({msg: err.msg})
    } else {
        next(err);
    }
})



app.use((err, req, res, next) => {
    res.status(500)
    res.send({msg: "Internal server error"})
})


app.use(express.static('public'));

module.exports = app; 