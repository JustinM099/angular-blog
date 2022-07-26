const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { connect, connection } = require('mongoose');
const postsRoutes = require('./routes/posts')

const app = express();

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/mean-messages';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('connected to database')
}).catch((err) => {
  console.log('connection failed', err)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(cors)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})

app.use('/api/posts/', postsRoutes);

module.exports = app;
