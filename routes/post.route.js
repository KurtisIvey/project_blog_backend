const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");

router.get("/", postController.posts);
router.get("/:id", postController.specificPost);
router.post("/new-post", postController.newPost__post);
router.delete("/:id", postController.specificPost__delete);
//comments
router.get("/:id/comments", postController.comments);
router.post("/:id/comments", postController.comments__post);

module.exports = router;
