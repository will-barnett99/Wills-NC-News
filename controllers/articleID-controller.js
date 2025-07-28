const fetchArticleById = require('../models/articleID-model')

const getArticleById = (req, res, next) => {
    const {article_id} = req.params
       return fetchArticleById(article_id).then((individualArticle) => {
        res.status(200)
        res.send({individualArticle})
    })
}


module.exports = getArticleById;