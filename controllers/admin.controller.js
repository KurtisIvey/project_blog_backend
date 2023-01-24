const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("../middleware/auth.js");

// error handlers
const loginErrorHandler =
  require("../utilities/error_handler.js").loginErrorHandler;

// imported models
const Admin = require("../models/admin.Schema");

exports.login__post = [
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await Admin.login(email, password);

      const token = jwt.sign(
        {
          username: admin.username,
          email: admin.email,
          _id: admin._id,
          isAdmin: admin.admin,
        },
        process.env.SECRET,
        // 3 hour expire
        { expiresIn: 60 * 60 * 3 }
      );
      //res.cookie("adminJwtToken", token, { httpOnly: true });

      return res.status(200).json({ status: "ok", token });
    } catch (err) {
      const errors = loginErrorHandler(err);
      console.log(err);

      return res.status(400).json({ status: "error", errors });
    }
  },
];

exports.logout__delete = (req, res) => {
  try {
    res
      .clearCookie("adminJwtToken")
      .json({ status: "ok", message: "successfully cleared adminJwtToken" });
  } catch (err) {
    console.log("clear cookie failed");
  }
};
