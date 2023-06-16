const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: String,
  content: {
    type: String,
    maxLength: 114,
    timestamp: { type: Date, default: Date.now },
  }
});

const PostSchema = new mongoose.Schema({
  author: String,
  message: {
    type: String,
    maxLength: 500
  },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema]
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;