const express = require("express");
const router = express.Router();
const { createPostController, getAllPostsController, likePostController, deletePostController, getSpecificPostController } = require("../controllers/postController");
const upload = require("../config/multerConfig");
const { isLoggedin } = require("../middlewares/isLoggedin");

router.post(
  "/create",
  isLoggedin,
  upload.fields([
    { name: "images", maxCount: 5 }
  ]),
  createPostController
);

router.get("/post/:id",getSpecificPostController)


router.get("/all-posts",getAllPostsController)

router.post("/post/like/:id",isLoggedin,likePostController)

router.delete("/delete/:id",isLoggedin,deletePostController)


module.exports = router;
