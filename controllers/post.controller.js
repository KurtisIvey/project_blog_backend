const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("../middleware/auth.js");
const Post = require("../models/post.Schema");
const Comment = require("../models/comment.Schema");
const { commentErrorHandler } = require("../utilities/error_handler.js");
const postErrorHandler =
  require("../utilities/error_handler.js").postErrorHandler;

exports.posts = [
  async (req, res) => {
    const posts = await Post.find({})
      .sort({ timestamp: -1 })
      .populate("author")
      .exec();
    res.json({ posts });
  },
];

exports.specificPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author").exec();
    //console.log(post);
    if (post === null) {
      res.status(404).json({ status: "error", error: "post does not exist" });
    } else {
      res.status(200).json({ post });
    }
  } catch (err) {
    res.status(400).json({ status: "error", error: err });
  }
};

exports.specificPost__delete = [
  isAdmin,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("author").exec();

      await post.remove();
      res.status(202).json({ status: "ok", message: "deletion successful" });
    } catch (err) {
      //console.log(err);
      res.status(400).json({ status: "error", message: err.message });
    }
  },
];

exports.newPost__post = [
  isAdmin,
  body("title").trim().escape(),
  body("textContent").trim().escape(),
  async (req, res) => {
    try {
      const token = req.cookies.adminJwtToken;
      const decoded = jwt.verify(token, process.env.SECRET);
      const post = new Post({
        title: req.body.title,
        textContent: req.body.textContent,
        author: decoded._id,
      });
      post.save((err) => {
        if (err) {
          const error = postErrorHandler(err);
          res.status(400).json({ status: "error", error: error });
        } else {
          res
            .status(201)
            .json({ status: "ok", message: "post creation success" });
        }
      });
    } catch (err) {
      res.json({ status: "error", error: err.message });
    }
  },
];

exports.comments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postRef: postId })
      .sort({ timestamp: 1 })
      .populate("author")
      .exec();
    //console.log(comments);
    res.status(200).json({ comments });
  } catch (err) {
    const error = commentErrorHandler(err);
    res.status(400).json({ status: "error", error });
  }
};

exports.comments__post = [
  body("comment").trim().escape(),
  async (req, res) => {
    //console.log(req.params.id);
    try {
      const token = req.cookies.userJwtToken;
      const decoded = jwt.verify(token, process.env.SECRET);
      const comment = new Comment({
        comment: req.body.comment,
        author: decoded._id,
        postRef: req.params.id,
      });
      comment.save((err) => {
        if (err) {
          //const error = postErrorHandler(err);
          res.status(400).json({ status: "error", error: err });
        } else {
          res
            .status(201)
            .json({ status: "ok", message: "comment creation success" });
        }
      });
    } catch (err) {
      //console.log(err.message);
      const error = commentErrorHandler(err);
      res.status(400).json({ status: "error", error, err: err.message });
    }
  },
];

exports.comment__delete = [
  //isAdmin,
  async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);

      await comment.remove();
      res
        .status(202)
        .json({ status: "ok", message: "deletion of comment successful" });
    } catch (err) {
      //console.log(err);
      res.status(400).json({ status: "error", message: err.message });
    }
  },
];
