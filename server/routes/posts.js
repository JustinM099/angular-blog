const express = require('express');
const Post = require('../models/post');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('invalid mimetype');
    if (isValid) {
      error = null
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-")
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('/', multer({storage: storage}).single("image"), (req, res, next) => {
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

router.get('/', (req, res, next) => {
  Post.find()
    .then(data => {
      console.log(data)
      res.status(200).json({
        message: 'success',
        posts: data
      });
    })

})

router.get('/:id', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => console.log(result))
  res.status(200).json({ message: 'post deleted' })
})

module.exports = router;
