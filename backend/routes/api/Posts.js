const express = require("express");
const router = express.Router();

// Item Model
const Post = require("../../models/Post");

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});

// @route   POST api/posts
// @desc    Create A Post
// @access  Public (should be private using authentication)
router.post("/", (req, res) => {
  const newPost = new Post({
    id: req.body.id,
    user: req.body.user,
    post: req.body.post,
    text: req.body.text,
    tags: req.body.tags
  });

  newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete A Post
// @access  Public (should be private using authentication)
router.delete("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
