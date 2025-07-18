# NC News Seeding

instructions for creating Database connections

1. - create a .env.development file.
2. - in .env.development file, write `PGDATABASE = db` (not as string) to connect to the development database.
3. - create a .env.test file.
4. - in .env.test file, write `PGDATABASE = db_test` (not as string) to connect to the test database.
5. - in your .gitignore file, write .env.* - this will ignore these files so that the connections to our databases are NOT pushed back up to GitHub