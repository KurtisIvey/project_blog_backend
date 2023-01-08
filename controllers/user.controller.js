const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

// error handlers
const loginErrorHandler =
  require("../utilities/error_handler.js").loginErrorHandler;

// imported models
const User = require("../models/user.Schema");

exports.register__post = [
  body("username").trim().escape().isLength({ min: 3 }),
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  async (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    user.save((err) => {
      if (err) {
        //console.log(err);
        const errors = loginErrorHandler(err);
        res.status(400).json({ status: "error", errors });
      } else {
        res.status(201).json({ status: "ok", message: "successful creation" });
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
      const user = await User.login(email, password);

      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          _id: user._id,
        },
        process.env.SECRET
      );
      res.cookie("userJwtToken", token, { httpOnly: true });

      return res.status(200).json({ status: "ok", token });
    } catch (err) {
      const errors = loginErrorHandler(err);
      console.log(err);

      return res.status(400).json({ status: "error", errors });
    }
  },
];
