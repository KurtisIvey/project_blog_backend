const bccrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

let csrfToken;

// error handlers
const loginErrorHandler =
  require("../utilities/error_handler.js").loginErrorHandler;
const postErrorHandler =
  require("../utilities/error_handler.js").postErrorHandler;

// imported models
const Admin = require("../models/admin.Schema");
const Post = require("../models/post.Schema");

exports.register__post = [
  body("username").trim().escape().isLength({ min: 3 }),
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  async (req, res) => {
    const { username, email, password } = req.body;

    const admin = new Admin({ username, email, password });
    admin.save((err) => {
      if (err) {
        const errors = loginErrorHandler(err);
        res.status(400).json({ success: "error", errors });
      } else {
        res.status(201).json({ status: "ok", admin: admin });
      }
    });
  },
];

exports.login__post = [
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  async (req, res) => {
    const { email, password } = req.body;
    csrfToken = uuidv4();
    try {
      const admin = await Admin.login(email, password);
      const token = jwt.sign(
        {
          username: admin.username,
          email: admin.email,
          _id: admin._id,
          csrfToken,
        },
        "secret123"
      );
      res.cookie("jwtToken", token, { httpOnly: true });
      res.cookie("csrfToken", csrfToken, { httpOnly: true });
      return res.status(200).json({ status: "ok", token });
    } catch (err) {
      const errors = loginErrorHandler(err);
      console.log(err);

      return res.status(400).json({ status: "error", errors });
    }
  },
];

exports.posts = async (req, res) => {
  console.log(req.cookies);
  const posts = await Post.find({}).populate("author").exec();
  res.json({ posts });
};

exports.newPost__post = [
  body("title").trim().escape(),
  body("textContent").trim().escape(),
  async (req, res) => {
    try {
      const token = req.headers["token"];
      const decoded = jwt.verify(token, "secret123");
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
