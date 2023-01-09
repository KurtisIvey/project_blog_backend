const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");

router.get("/", postController.posts);
router.get("/:id", postController.specificPost);
router.post("/new-post", postController.newPost__post);
router.delete("/:id", postController.specificPost__delete);

module.exports = router;
