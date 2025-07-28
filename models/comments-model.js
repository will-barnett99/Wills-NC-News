const db = require('../db/connection');

const fetchCommentsbyArticleId = (article_id) => {
    return db.query(`SELECT comments.* FROM comments LEFT JOIN articles ON comments.article_id = articles.article_id WHERE comments.article_id = $1 ORDER BY created_at DESC;`, [article_id])
    .then(({rows: comments}) => {
        return comments;
    })
}



module.exports = fetchCommentsbyArticleId