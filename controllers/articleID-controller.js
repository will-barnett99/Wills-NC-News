const {fetchArticleById, patchUpdatedArticleVotes} = require('../models/articleID-model')

const getArticleById = (req, res, next) => {
    const {article_id} = req.params
       return fetchArticleById(article_id).then((individualArticle) => {
        res.status(200)
        res.send({individualArticle})
    })
}

const updateArticleVotes = (req, res, next) => {

    const {inc_votes} = req.body

    const {article_id} = req.params;

    return patchUpdatedArticleVotes(article_id, inc_votes).then((votesOnArticle) => {
        res.status(200)
        res.send({votesOnArticle})
    })
}


module.exports = {getArticleById, updateArticleVotes};