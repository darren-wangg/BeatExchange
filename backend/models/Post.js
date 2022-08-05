const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  post: {
    type: Object,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: Array,
    default: [],
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
