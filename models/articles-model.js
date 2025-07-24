const db = require('../db/connection');


const fetchArticles = () => {
    console.log('hello from articles model')
    return db.query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS "comment_count" FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id;`).then(({rows: articles}) => {
        console.log(articles)
        return articles;
    });
    
}



module.exports = fetchArticles;