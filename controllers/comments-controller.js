const {fetchCommentsbyArticleId, postCommentByArticleId} = require('../models/comments-model')


const getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    if(isNaN(Number(article_id))) {
        return res.status(400).send({msg: 'Bad Request'})
    }
    fetchCommentsbyArticleId(article_id).then((comments) => {
        res.status(200)
        res.send({comments})
    })
    .catch(next)

}

const updateCommentsbyArticleId = (req, res, next) => {
    const newComment = req.body
    const {article_id} = req.params;
    postCommentByArticleId(article_id, newComment)
    .then((comment) => {
        res.status(201)
        res.send({comment})
    })
}




module.exports = {getCommentsByArticleId, updateCommentsbyArticleId}