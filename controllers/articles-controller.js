const fetchArticles = require('../models/articles-model');

const getArticles = (req, res, next) => {
    const {sort_by, order} = req.query
    fetchArticles(sort_by, order)
    .then((articles) => {
        res.status(200);
        res.send({articles})
    })
    .catch((err) => {
        next(err)
    })
    
}



module.exports = getArticles