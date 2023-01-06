const bccrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utilities/error_handler.js").errorHandler;

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
        const errors = errorHandler(err);
        res.status(400).json({ errors });
      } else {
        res
          .status(201)
          .json({ message: "success creating admin", admin: admin });
      }
    });
  },
];

exports.login__post = [
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await Admin.login(email, password);
      const token = jwt.sign(
        { username: admin.username, email: admin.email, _id: admin._id },
        "secret123"
      );
      return res.status(200).json({ status: "ok", token });
    } catch (err) {
      const errors = errorHandler(err);
      console.log(err);

      return res.json({ status: "error", admin: false, errors });
    }
  },
];

exports.newPost__post = [
  body("title").trim().escape(),
  body("textContent").trim().escape(),
  async (req, res) => {
    try {
      const token = req.headers["token"];
      const decoded = jwt.verify(token, "secret123");

      return res.json({ token: decoded });
    } catch (err) {
      console.log(err);
      res.json({ status: "error", error: "invalid token" });
    }
  },
];
