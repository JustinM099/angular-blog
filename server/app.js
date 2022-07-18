const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: '112233445', title: 'first serverside post', content: 'content from server'
    },
    {
      id: '112233446', title: 'second serverside post', content: 'content from server'
    },

  ]
  res.status(200).json({
    message: 'success',
    posts: posts
  });
})

module.exports = app;
