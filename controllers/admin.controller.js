const bccrypt = require("bcrypt");
const Admin = require("../models/admin.Schema");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  res.render("admin");
};

exports.register__post = [
  body("username").trim().escape().isLength({ min: 3 }),
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const admin = await Admin.create({ username, email, password });
      console.log(admin);
      res.status(201).json({ message: "success creating admin", admin: admin });
    } catch (err) {
      console.log(err);
    }
  },
];

exports.login__post = [
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const admin = await Admin.login(email, password);
      const token = jwt.sign(
        { username: admin.username, email: admin.email },
        "secret123"
      );
      return res.status(200).json({ status: "ok", token });
    } catch (err) {
      console.log(err);
    }
  },
];
