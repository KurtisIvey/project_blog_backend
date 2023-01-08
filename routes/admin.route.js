// admin routes
// login / get post / new post / edit post / delete post /

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// register router to get admin into admin collection
//router.get("/register", adminController.register);
//router.post("/register", adminController.register__post);
router.post("/login", adminController.login__post);

/* 
// login , logout controlled via deletion of jwt on client side
router.get("/login", adminController.login);

// posts/admin home

// single post
router.get("/posts/:id", adminController.post);
router.get("/posts/:id/edit", adminController.post);
router.get("/posts/:id/comments", adminController.post_comments);
router.delete("/posts/:id/comments", adminController.post_comments__delete);

router.put("/posts/:id/edit", adminController.post__put);
router.delete("/posts/:id", adminController.post__delete);

// new post
router.get("/posts/new-post", adminController.newPost);
*/
module.exports = router;
