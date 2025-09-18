
const express = require('express')
const app = express()
const getTopics = require('./controllers/topics-controller')
const getArticles = require('./controllers/articles-controller')
const getUsers = require('./controllers/users-controller')
const {getArticleById, updateArticleVotes} = require('./controllers/articleID-controller')
const {getCommentsByArticleId, updateCommentsbyArticleId} = require('./controllers/comments-controller')
const deleteCommentByCommentId = require('./controllers/commentID-controller')
const cors = require('cors');

app.use(cors({origin: 'https://wills-news.netlify.app'}));

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)


app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)


app.get('/api/users', getUsers)

app.post('/api/articles/:article_id/comments', updateCommentsbyArticleId)

app.patch('/api/articles/:article_id', updateArticleVotes)

app.delete('/api/comments/:comment_id', deleteCommentByCommentId)




app.use((req, res) => { 
res.status(404).send({msg: 'Path not found'})
})

app.use((err, req, res, next) => {
    if(err.code === "22P02") {
        res.status(400).send({msg: "Bad Request"})
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err);
    }
})



app.use((err, req, res, next) => {
    console.log(err, "error")
    res.status(500).send({msg: "Internal server error"})
})


app.use(express.static('public'));

module.exports = app; 