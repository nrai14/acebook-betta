const Post = require("../models/post");

const PostsController = {
  // renders posts on timeline
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts });
    });
  },

  // renders an empty template
  New: (req, res) => {
    res.render("posts/new", {});
  },
  // creates new post on submit
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      // Create: (req, res) => {
      //   const post = new Post({
      //     author: req.body.author,
      //     message: req.body.message
      //   });


      res.status(201).redirect("/posts");
    });
  },

  //
};

module.exports = PostsController;
