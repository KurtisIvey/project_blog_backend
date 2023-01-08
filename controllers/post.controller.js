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
