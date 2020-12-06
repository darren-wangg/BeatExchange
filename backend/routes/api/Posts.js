const express = require("express");
const router = express.Router();

// Item Model
const Post = require("../../models/Post");

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

// @route   GET api/posts/:id
// @desc    Get a specific post
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json({ post: post, success: true }))
    .catch((err) => res.status(404).json({ error: err, success: false }));
});

// @route   POST api/posts
// @desc    Create a post
// @access  Public (should be private using authentication)
router.post("/", (req, res) => {
  const newPost = new Post({
    id: req.body.id,
    user: req.body.user,
    post: req.body.post,
    text: req.body.text,
    tags: req.body.tags,
  });

  newPost.save()
    .then((post) => res.json({ post: post, success: true }))
    .catch((err) => res.status(404).json({ error: err, success: false }));
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Public (should be private using authentication)
router.delete("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) =>
      post.remove().then(() => res.json({ deleted: post, success: true }))
    )
    .catch((err) => res.status(404).json({ error: err, success: false }));
});

// @route   POST api/posts/:id
// @desc    Like a post
// @access  Public (should be private using authentication)
router.post("/:id/like", (req, res) => {
  Post.update(
    {
      _id: req.params.id,
      likes: { $ne: req.body.user },
    },
    {
      $push: { likes: req.body.user },
    }
  )
    .then(res.json({ user: req.body.user, success: true }))
    .catch((err) => res.status(404).json({ error: err, success: false }));
});

// @route   POST api/posts/:id
// @desc    Unlike a post
// @access  Public (should be private using authentication)
router.post("/:id/unlike", (req, res) => {
  Post.update(
    {
      _id: req.params.id,
    },
    {
      $pull: { likes: req.body.user },
    }
  )
    .then(res.json({ user: req.body.user, success: true }))
    .catch((err) => res.status(404).json({ error: err, success: false }));
});

module.exports = router;
