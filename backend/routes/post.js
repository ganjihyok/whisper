const express = require('express');
const app = express();
const PostRouter = express.Router();

const Post = require('../models/Post');

PostRouter.route('/add').post(function (req, res) {
  let post = new Post(req.body);
  post.save()
    .then(post => {
      console.log(post)
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

PostRouter.route('/').get(function (req, res) {
    Post.find(function (err, posts) {
      if(err){
        console.log(err);
      }
      else {
        res.json(posts);
      }
    }).limit(10);
});

// Defined delete | remove | destroy route
PostRouter.route('/delete/:id').get(function (req, res) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

module.exports = PostRouter;