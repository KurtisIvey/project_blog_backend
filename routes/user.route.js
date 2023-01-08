// user routes / register / login / posts / comment /

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// homepage that shows all blog posts
router.post("/register", userController.register__post);
router.post("/login", userController.login__post);
//router.delete("/logout", userController.logout__delete);

module.exports = router;
