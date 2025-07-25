const fetchArticleById = require('../models/articleID-model')

const getArticleById = (req, res) => {
    const {article_id} = req.params
        fetchArticleById(article_id).then((individualArticle) => {
        res.status(200)
        res.send({individualArticle})
    })
}


module.exports = getArticleById;