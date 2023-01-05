// user routes / register / login / posts / comment /

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// homepage that shows all blog posts
router.get("/posts", userController.posts);
router.get("/posts/:id", userController.post);
router.get("/posts/:id/comments", userController.post_comments);
router.post("/posts/:id/comments", userController.post_comments__post);
