# Bored Api

<!-- Will setup a script on run both backend and frontend at a go similar to strapi -->

## How to Setup the Project

First clone the project

```sh
    git clone https://github.com/iansamz/bored-api
```

### Setup Backend

1. Change Directory. `cd backend`
2. Install dependecies: I prefer pnpm. so `pnpm i`
3. Run `cp .env.example .env`
4. Create MongoDB account and create a database.
5. Set up MongoDB database
   1. Set up a MongoDB account via the following tutorial: Create MongoDB Account.
   2. Set up MongoDB cluster. Create Cluster
   3. Set up MongoDB User.
   4. Get the MongoDB Connection URI.
   5. Copy the connection URI string to `DATABASE_URL=` in your .env.
   6. Add the database name to `DATBASE_URL`. The url appear as so: `DATABASE_URL="mongodb+srv://username:<password>@app.random.mongodb.net/database?retryWrites=true&w=majority"`
6. Make sure you have docker installed. Run `pnpm infrastrcture:up` to get Redis and RabbitMQ containers running
7. Then run `pnpm start`
8. Go to `http://localhost:4001/graphql`
9. Youre ready to setup your frontend application.

### Setup Frontend

1. Change Directory. `cd ../frontend`
2. Install dependecies: `pnpm i`
3. Run the Next application `pnpm dev`
