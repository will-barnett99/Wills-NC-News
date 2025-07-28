const fetchCommentsbyArticleId = require('../models/comments-model')


const getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    fetchCommentsbyArticleId(article_id).then((comments) => {
        res.status(200)
        res.send({comments})
    })

}


module.exports = getCommentsByArticleId;