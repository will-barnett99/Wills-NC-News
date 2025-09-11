const db = require('../db/connection');

const fetchCommentsbyArticleId = (article_id) => {
    return db.query(`SELECT comments.* FROM comments LEFT JOIN articles ON comments.article_id = articles.article_id WHERE comments.article_id = $1 ORDER BY created_at DESC;`, [article_id])
    .then(({rows: comments}) => {
        return comments;
    })
}

const postCommentByArticleId = (article_id, newComment) => {
    const {username, body} = newComment;
    return db.query(`INSERT INTO comments (author, body, article_id)
                    VALUES ($1, $2, $3)
                    RETURNING *;`,
                [username, body, article_id])
    
    .then(({rows}) => {
        return rows[0]
    })
    .catch((err) => {
        throw err;
    })
}



module.exports = {fetchCommentsbyArticleId, postCommentByArticleId}