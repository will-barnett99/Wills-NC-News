const fetchArticles = require('../models/articles-model');

const getArticles = (req, res) => {
   console.log('hello from article controller')
    fetchArticles().then((articles) => {
        res.status(200);
        res.send({articles})
    })
}



module.exports = getArticles;