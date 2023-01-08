const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");

router.get("/", postController.posts);
router.post("/new-post", postController.newPost__post);

module.exports = router;
