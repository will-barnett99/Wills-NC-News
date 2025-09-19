const db = require('../db/connection');


const fetchArticles = (sort_by = 'created_at', order = 'desc') => {

    const validColumns = [
        'article_id',
        'title',
        'topic',
        'author',
        'created_at',
        'votes',
        'article_img_url',
        'comment_count'
    ];

    const validOrders = ['asc', 'desc']

    if(!validColumns.includes(sort_by)) {
        return Promise.reject({status:400, msg: 'Invalid sort_by column'});
    }

    const lowerOrder = order.toLowerCase();
    if(!validOrders.includes(lowerOrder)){
        return Promise.reject({status:400, msg:'Invalid order value'})
    }

    return db.query(`SELECT articles.article_id,
         articles.title,
         articles.topic,
         articles.author, 
         articles.created_at, 
         articles.votes, 
         articles.article_img_url, 
         COUNT(comments.article_id)::INT AS "comment_count" 
         FROM articles 
         LEFT JOIN comments ON comments.article_id = articles.article_id 
         GROUP BY articles.article_id
         ORDER BY ${sort_by} ${order};`).then(({rows: articles}) => {
        return articles;
    });
    
}



module.exports = fetchArticles;