const db = require('../db/connection');

const fetchArticleById = (article_id) => {
    console.log("hello")
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows: individualArticle}) => {
        return individualArticle;
    })
}

module.exports = fetchArticleById;