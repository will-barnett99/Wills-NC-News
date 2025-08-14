const db = require('../db/connection');

const fetchArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article not found" });
            
        } 
       const article = rows[0];
       return article;
        
    })
}

const patchUpdatedArticleVotes = (article_id, inc_votes) => {
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,[inc_votes, article_id])
    .then(({rows}) => {
        const article = rows[0];

        return article
    })
}

module.exports = {fetchArticleById, patchUpdatedArticleVotes};


