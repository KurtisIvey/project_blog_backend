const bccrypt = require("bcrypt");
const Admin = require("../models/admin.Schema");
const { body, validationResult } = require("express-validator");

exports.register = (req, res) => {
  res.render("admin");
};
/*
exports.register__post = [
  body("username").trim().escape().isLength({ min: 3 }),
  body("email").isEmail().normalizeEmail(),
  body("password").trim().escape(),
  (req, res) => {
    console.log(req.body);
  },
];
 */
exports.register__post = async (req, res) => {
  const bod = await req.body;
  console.log(bod);
};
