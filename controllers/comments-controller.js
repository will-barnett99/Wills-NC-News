const {fetchCommentsbyArticleId, postCommentByArticleId} = require('../models/comments-model')


const getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    fetchCommentsbyArticleId(article_id).then((comments) => {
        res.status(200)
        res.send({comments})
    })

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