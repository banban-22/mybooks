const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
// const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const port = 8080;
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined. Check your environment variable');
  process.exit(1);
}
mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB'.green.bold);
  } catch (error) {
    console.error('Error connecting to MONGODB: ', error);
    process.exit(1);
  }
};
connectDB();

app.use(
  session({
    resave: false,
    secret: 'aaaaa',
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      collection: 'sessions',
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(port, () =>
  console.log(`Server is running on port ${port}`.yellow.bold)
);
