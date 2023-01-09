const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("../middleware/auth.js");
const Post = require("../models/post.Schema");
const postErrorHandler =
  require("../utilities/error_handler.js").postErrorHandler;

exports.posts = [
  async (req, res) => {
    const posts = await Post.find({}).populate("author").exec();
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
