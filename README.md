# NC News Seeding

instructions for creating Database connections

clone the repo to your local device

firstly run npm install - yoou will need NODE installed on your machine.

1. - create a .env.development file.
2. - in .env.development file, write `PGDATABASE = db` (not as string) to connect to the development database.
3. - create a .env.test file.
4. - in .env.test file, write `PGDATABASE = db_test` (not as string) to connect to the test database.
5. - in your .gitignore file, write .env.* - this will ignore these files so that the connections to our databases are NOT pushed back up to GitHub





# Northcoders News API

## Hosted Version

The live version of this API can be accessed at: *TO BE INSERTED*

## Project Summary

Northcoders News API is a RESTful backend service built with Node.js, Express, and PostgreSQL. This API serves as the backend for a news aggregation and discussion platform, similar to Reddit. It provides endpoints for articles, comments, topics, and users, allowing clients to perform CRUD operations and interact with the data.

Key features include:
- Retrieve articles with filtering, sorting, and pagination
- Post, update, and delete comments
- Vote on articles
- User authentication and management
- Topic categorization

## Getting Started

### Prerequisites

Ensure you have the following minimum versions installed:

- **Node.js**: v20.0.0 or higher
- **PostgreSQL**: v14.0 or higher

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

2. **Install dependencies:**

```bash
npm install
```

### Environment Setup

You need to create two `.env` files in the root directory to connect to the databases locally:

1. **Create `.env.development`:**

```bash
PGDATABASE=nc_news
```

2. **Create `.env.test`:**

```bash
PGDATABASE=nc_news_test
```

**Important:** These files are gitignored and will not be pushed to GitHub. Make sure to create them locally before running the project.

### Database Setup

1. **Create the databases:**

```bash
npm run setup-dbs
```

2. **Seed the development database:**

```bash
npm run seed
```

### Running Tests

To run the test suite:

```bash
npm test
```

To run a specific test file:

```bash
npm test app.test.js
```

### Starting the Server

To start the development server:

```bash
npm start
```

The server will run on `http://localhost:9090` by default.

## Available Endpoints

- `GET /api` - Serves a JSON representation of all available endpoints
- `GET /api/topics` - Serves an array of all topics
- `GET /api/articles` - Serves an array of all articles
- `GET /api/articles/:article_id` - Serves a single article by ID
- `PATCH /api/articles/:article_id` - Updates article votes
- `GET /api/articles/:article_id/comments` - Serves all comments for an article
- `POST /api/articles/:article_id/comments` - Posts a new comment to an article
- `DELETE /api/comments/:comment_id` - Deletes a comment by ID
- `GET /api/users` - Serves an array of all users

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Jest & Supertest (testing)
- node-postgres (pg)

---
