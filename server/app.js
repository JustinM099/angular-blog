const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { connect, connection } = require('mongoose');

const Post = require('./models/post');

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

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(data => {
    res.status(201).json({
      message: 'post added successfully',
      postId: data._id
    });
  });

});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(data => {
      console.log(data)
      res.status(200).json({
        message: 'success',
        posts: data
      });
    })

})

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({message: 'post not found'})
      }
    })
  }
)

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'update successful'})
  })
})

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => console.log(result))
  res.status(200).json({ message: 'post deleted' })
})

module.exports = app;
