const endpointsJson = require("../endpoints.json");
const app = require('../app')
const db = require('../db/connection')
const data = require('../db/data/test-data')
const request = require('supertest')
const seed = require('../db/seeds/seed')
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

beforeEach(() => {
   return seed(data);
})

afterAll(() => {
  return db.end()
})


describe("GET /api", () => {
  test.skip("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an object with a key of topics and a value of an array of topic objects, which should each have slug and description properties", () => {
    return request(app)
    .get('/api/topics/')
    .expect(200)
    .then(({body: { topics } }) => {
     expect(topics).toHaveLength(3)
     topics.forEach((topic) => {
      expect(topic).toMatchObject({
        slug: expect.any(String),
        description: expect.any(String),
        img_url: expect.any(String),
      })
     })
  })
})
})

describe("GET /api/articles", () => {
  test("200: Responds with an object with a key of articles the value of which is an array of objects with correct properties", () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({ body: {articles} }) => {
      expect(articles).toHaveLength(13) //change this when we get data back
      articles.forEach((article) => {
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
          comment_count: expect.any(Number),
        })
      })
    })
  })
})

describe('GET /api/users', () => {
  test('200: responds with an object with a key of users, the value of which is an array of objects with the correct properties', () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({body: {users}}) => {
      expect(users.length).not.toBe(0)
      users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String),
        })
      })
    })
  })
})

describe('GET /api/articles/:article_id', () => {
  test('200: responds with an with an object with a key of article the value of which is an object with the correct properties', () => {
    return request(app)
    .get('/api/articles/2')
    .expect(200)
    .then(({body: {individualArticle}}) => {
      expect(individualArticle).toMatchObject({
           author: expect.any(String),
           title: expect.any(String),
           article_id: expect.any(Number),
           body: expect.any(String),
           topic: expect.any(String),
           created_at: expect.any(String),
           votes: expect.any(Number),
           article_img_url: expect.any(String),
      })
    })
  })
  test('400: responds with an error message when a request is made for an article_id of wrong data type', () => {
    return request(app)
    .get('/api/articles/not-a-number')
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Bad Request")
    })
  })
  test('404: responds with an error message when a request is made to an endpoint that does not exist', () => {
    return request(app)
    .get('/api/articles/9000')
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe('Article not found')
    })
  })
})


describe('GET /api/articles/:article_id/comments', () => {
  test('200: responds with an object with an article of comments, the value of which is an array of comment objects housing appropriate properties', () => {
    return request(app)
    .get('/api/articles/3/comments')
    .expect(200)
    .then(({body: {comments}}) => {
      expect(comments.length).not.toBe(0)
      comments.forEach((comment) => {
        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          article_id: expect.any(Number),
        })
      })
    })
  })
  test('400: responds with an error message when request made for an article_id of wrong data type', () => {
    return request(app)
    .get('/api/articles/not-a-number/comments')
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe('Bad Request')
    })
  })
})

