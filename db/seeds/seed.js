const db = require("../connection")
const queries = require("./create-table-queries")
const format = require("pg-format");
const { createLookupRef } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
  .query(queries.createTables)
  .then(() => {
    const topicsQuery = format(
      `INSERT INTO topics(description, slug, img_url) VALUES %L RETURNING *`,
      topicData.map(({description, slug, img_url}) => [
        description,
        slug,
        img_url,
      ])
    );
    const usersQuery = format(
      `INSERT INTO users(username, name, avatar_url) VALUES %L RETURNING *`,
      userData.map(({username, name, avatar_url}) => [
        username,
        name,
        avatar_url
      ])
    );
    return Promise.all([db.query(topicsQuery), db.query(usersQuery)]);
  })
  .then(() => {
    const preparedArticleData = articleData.map(({
      title,
      topic,
      author,
      body,
      created_at,
      votes,
      article_img_url,
    }) => [
      title,
      topic,
      author,
      body,
      new Date(created_at),
      votes,
      article_img_url
    ]
  );

  const articlesInsertQuery = format(
    `INSERT INTO articles(
    title, topic, author, body, created_at, votes, article_img_url)
    VALUES
    %L
    RETURNING *`,
    preparedArticleData
  );
  
    return db.query(articlesInsertQuery);
  })

  .then(({rows: articles}) => {

    const lookupRef = createLookupRef(articles, "title", "article_id")


    const preparedCommentData = commentData.map(({
      article_title,
      body,
      author,
      votes,
      created_at
    }) => [
      lookupRef[article_title],
      body,
      author,
      votes,
      new Date(created_at)
    ]
  );
    const commentsInsertQuery = format(
    `INSERT INTO comments(article_id, body, author, votes, created_at)
    VALUES
    %L
    RETURNING *`,
    preparedCommentData
  );
    return db.query(commentsInsertQuery);
  })
      
  
   //<< write your first query in here.
};
module.exports = seed;
